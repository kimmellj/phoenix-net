const os = require('os')
const ifaces = os.networkInterfaces()

class Util {
  static getIPAddress () {
    let results = []

    Object.keys(ifaces).forEach((ifname) => {
      let alias = 0

      ifaces[ ifname ].forEach((iface) => {
        if (iface.family !== 'IPv4' || iface.internal !== false) {
          // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
          return
        }

        if (alias >= 1) {
          // this single interface has multiple ipv4 addresses
          results.push(iface.address)
        } else {
          // this interface has only one ipv4 adress
          results.push(iface.address)
        }
        ++alias
      })
    })

    return results.join(' / ')
  }
}

module.exports = Util
