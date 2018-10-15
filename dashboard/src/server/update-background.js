const dropboxV2Api = require( "dropbox-v2-api" ),
    async = require( "async" ),
    fs = require( "fs" ),
    sharp = require( "sharp" ), // Resize and make image web friendly
    log = require( "pretty-log" ),
    Promise = require( "bluebird" ),
    randomNumber = require( "random-number-csprng" )

class UpdateBackground {
    constructor() {
        log.debug = () => {}
        log.warn = () => {}
        this.cursor = null
        this.dropbox = dropboxV2Api.authenticate( {
            "token": process.env.DROPBOX_ACCESS_TOKEN
        } )
        this.files = []
        this.folder = `${__dirname}/../../dist/backgrounds/`

        if ( !fs.existsSync( this.folder ) ) {
            log.debug( `Creating folder: ${this.folder}` )
            fs.mkdirSync( this.folder )
        }

    }

    process( err, result, callback ) {
        if ( err ) {
            log.error( err )
            callback( err )
            return
        }

        result.entries.filter( ( entry ) => {
            if ( entry[ ".tag" ] === "file" ) {
                if ( entry.name.substr( 0, 1 ) !== "." ) {
                    log.debug( `Entry: ${entry.name} preserved!` )
                    return true
                }
            }

            log.warn( `Entry: ${entry.name} rejected!` )
            return false
        } ).map( ( file ) => {
            return {
                "name": file.name,
                "path": file.path_lower,
                "id": file.content_hash
            }
        } ).forEach( ( file ) => {
            this.files.push( file )
        } )

        log.debug( `We have a total of: ${this.files.length} files to process` )

        if ( result.has_more ) {
            log.debug( "There are more files to get, try to fetch them now" )
            this.refresh( result.cursor, callback )
        } else {
            log.debug( "There are no more files, cache the ones we know about." )
            this.cache( callback )
        }
    }

    processFile( image, callback, folder, dropbox ) {
        if ( fs.existsSync( `${folder}${image.id}` ) ) {
            log.debug( `Image ${image.id} already exists!` )
            callback( null, image )
            return
        }

        let returnMessage = `Need to download: ${image.path}`

        log.debug( returnMessage )

        dropbox( {
            "resource": "files/download",
            "parameters": {
                "path": image.path
            }
        }, ( err ) => {
            if ( err ) {
                log.error( "Dropbox error! files/download" )
                log.error( err )
                callback( null, "invalid" )
                return
            }

            log.debug( `Going to process image: ${image.id}-raw` )
            this.resizeProcessImage( folder, image, callback )
        } ).pipe(
            fs.createWriteStream( `${folder}${image.id}-raw` )
        )
    }

    getRandomBackground( ) {
        return Promise.try( () => {
            return randomNumber( 0, this.files.length - 1 )
        } ).then( ( number ) => {
            log.debug( `Random Number Generated: ${number}` )
            let image = this.files[ number ]

            fs.writeFileSync( `${this.folder}current-image.json`, JSON.stringify( {
                "image": image.id
            } ) )

            return
        } ).catch( {
            "code": "RandomGenerationError"
        }, ( randomCodeErr ) => {
            if ( randomCodeErr ) {
                log.error( randomCodeErr )
                return
            }
        } )
    }

    resizeProcessImage( folder, image, callback ) {
        sharp( `${folder}${image.id}-raw` )
            .resize( 1920, 1080 )
            .toFile( `${folder}${image.id}`, ( sharpErr ) => {
                if ( sharpErr ) {
                    log.error( sharpErr )
                    callback( null, "invalid" )
                    return
                }

                log.debug( `${image.id} was saved to disk` )

                if ( fs.existsSync( `${folder}${image.id}-raw` ) ) {
                    log.debug( ` Delete raw image: ${image.id}-raw` )
                    fs.unlinkSync( `${folder}${image.id}-raw` )
                } else {
                    log.debug( ` Raw image: ${image.id}-raw was missing` )
                }


                // Intentionally slow it down, so we dont burn up the FS
                setTimeout( () => {
                    callback( null, image )
                }, 700 )

            } )
    }

    cache( finalCallback ) {
        const folder = this.folder,
            dropbox = this.dropbox

        let totalNumFiles = this.files.length,
            numFilesProcessed = 0

        log.success( `Caching ${totalNumFiles} files to disk...` )


        log.debug( "Downloading files 5 at a time" )
        async.mapLimit( this.files, 5, ( image, callback ) => {
            this.processFile( image, callback, folder, dropbox )
        }, ( err, results ) => {
            if ( err ) {
                log.error( err )
                finalCallback( err, null )
            }

            log.success( `Processed ${numFilesProcessed} files...` )

            const finalResults = results.filter( ( value ) => {
                return value !== "invalid"
            } )

            this.saveFileList( finalResults, folder, finalCallback )
        } )
    }

    saveFileList( files, folder, callback ) {
        this.files = files
        fs.writeFileSync( `${folder}images.json`, JSON.stringify( files ) )
        log.success( `${folder}images.json has been saved!` )
        callback( null, files )
    }

    refresh( cursor, callback ) {
        let params = null

        log.success( "Refreshing locally downloaded backgrounds ..." )

        if ( cursor ) {
            params = {
                "cursor": cursor
            }

        } else {
            params = {
                "path": "/Backgrounds",
                "recursive": true,
                "include_media_info": true
            }
        }
        this.dropbox( {
            "resource": ( cursor ) ? "files/list_folder/continue" : "files/list_folder",
            "parameters": params
        }, ( err, result ) => {
            this.process( err, result, callback )
        } )
    }
}

module.exports = UpdateBackground
