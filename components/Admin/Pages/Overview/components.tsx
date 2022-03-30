export const userFilter = (filter, x, y) => {
  if (filter === 'Sort by Pending') {
    if (x.uid && y.uid) {
      if (x.qualified === '') {
        if (y.qualified === 'yeah') { return -1 }
        else if (y.qualified === 'nope') { return -1 }
        else if (y.qualified === '') { return 0 }
      }
      else if (x.qualified === 'yeah') {
        if (y.qualified === 'yeah') { return 0 }
        else if (y.qualified === 'nope') { return -1 }
        else if (y.qualified === '') { return 1 }
      }
      else if (x.qualified === 'nope') {
        if (y.qualified === 'yeah') { return 1 }
        else if (y.qualified === 'nope') { return 0 }
        else if (y.qualified === '') { return 1 }
      }
    }
    else if (x.uid) { return -1 }
    else { return 0 } // not applied
  }
  else if (filter === 'Sort by Approved') {
    if (x.uid && y.uid) {
      if (x.qualified === '') {
        if (y.qualified === 'yeah') { return 1 }
        else if (y.qualified === 'nope') { return 1 }
        else if (y.qualified === '') { return 0 }
      }
      else if (x.qualified === 'yeah') {
        if (y.qualified === 'yeah') { return 0 }
        else if (y.qualified === 'nope') { return -1 }
        else if (y.qualified === '') { return -1 }
      }
      else if (x.qualified === 'nope') {
        if (y.qualified === 'yeah') { return 1 }
        else if (y.qualified === 'nope') { return 0 }
        else if (y.qualified === '') { return -1 }
      }
    }
    else if (x.uid) { return -1 }
    else { return 0 } // not applied
  }
  else if (filter === 'Sort by Rejected') {
    if (x.uid && y.uid) {
      if (x.qualified === '') {
        if (y.qualified === 'yeah') { return 1 }
        else if (y.qualified === 'nope') { return 1 }
        else if (y.qualified === '') { return 0 }
      }
      else if (x.qualified === 'yeah') {
        if (y.qualified === 'yeah') { return 0 }
        else if (y.qualified === 'nope') { return 1 }
        else if (y.qualified === '') { return -1 }
      }
      else if (x.qualified === 'nope') {
        if (y.qualified === 'yeah') { return -1 }
        else if (y.qualified === 'nope') { return 0 }
        else if (y.qualified === '') { return -1 }
      }
    }
    else if (x.uid) { return -1 }
    else { return 0 } // not applied
  }
  else if (filter === 'Sort A to Z by Name') {
    if (x.uid && y.uid) {
      var xFullName = (x.name.first + " " + x.name.last).toLowerCase()
      var yFullName = (y.name.first + " " + y.name.last).toLowerCase()
      if (xFullName > yFullName) { return 1 }
      else if (xFullName < yFullName) { return -1 }
      else { return 0}
    }
    else if (x.uid) { return -1 }
    else { return 0 } // not applied
  }
  else if (filter === 'Sort Z to A by Name') {
    if (x.uid && y.uid) {
      var xFullName = (x.name.first + " " + x.name.last).toLowerCase()
      var yFullName = (y.name.first + " " + y.name.last).toLowerCase()
      if (xFullName > yFullName) { return -1 }
      else if (xFullName < yFullName) { return 1 }
      else { return 0}
    }
    else if (x.uid) { return -1 }
    else { return 0 } // not applied
  }
  else if (filter === 'Sort A to Z by Email') {
    var xEmail = x.email.toLowerCase()
    var yEmail = y.email.toLowerCase()
    if (xEmail > yEmail) { return 1 }
    else if (xEmail < yEmail) { return -1 }
    else { return 0}
  }
  else if (filter === 'Sort Z to A by Email') {
    var xEmail = x.email.toLowerCase()
    var yEmail = y.email.toLowerCase()
    if (xEmail > yEmail) { return -1 }
    else if (xEmail < yEmail) { return 1 }
    else { return 0}
  }
  else if (filter === 'Sort by Pending Approval') {
    if (x.uid && y.uid) {
      if (x.criteriaMet && x.criteriaMet != y.criteriaMet) { return -1 }
      else if (y.criteriaMet && x.criteriaMet != y.criteriaMet) { return 1 }
      else { return 0 }
    }
    else if (x.uid) { return -1 }
    else { return 0 } // not applied
  }
  else if (filter === 'Sort by Pending Rejection') {
    if (x.uid && y.uid) {
      if (x.criteriaMet && x.criteriaMet != y.criteriaMet) { return 1 }
      else if (y.criteriaMet && x.criteriaMet != y.criteriaMet) { return -1 }
      else { return 0 }
    }
    else if (x.uid) { return -1 }
    else { return 0 } // not applied
  }
}

// check if a search matches
export const userMatch = (searchQuery, user) => {
  var uidMatch = true
  var emailMatch = true
  var nameMatch = true
  var match = true
  if (searchQuery.uid) {
    if (!(user.uid && user.uid.includes(searchQuery.uid))) { uidMatch = false }
  }
  if (searchQuery.email) {
    if (!(user.email && user.email.toLowerCase().includes(searchQuery.email.toLowerCase()))) { emailMatch = false }
  }
  if (searchQuery.name) {
    if (user.name && user.name.first && user.name.last) {
      var full_name = (user.name.first + user.name.last).toLowerCase().replace(/\s/g, '')
      if (!(full_name.includes(searchQuery.name.toLowerCase().replace(/\s/g, '')))) { nameMatch = false }
    }
    else { nameMatch = false }
  }
  if (!uidMatch || !emailMatch || !nameMatch) { match = false }
  return match
}

export const userViewDisplay = (view, user) => {
  if (view === 'All Users') {
    return Boolean(true)
  }
  else if (view === 'Pending') {
    return (user.qualified === '')
  }
  else if (view === 'Not Applied') {
    return !user.uid
  }
  else if (view === 'Approved') {
    return (user.qualified === 'yeah')
  }
  else if (view === 'Rejected') {
    return (user.qualified === 'nope')
  }
  else if (view === 'Checked-In') {
    return user.qualified === 'yeah' && user.checkedIn
  }
  else if (view === 'Not Checked-In') {
    return user.qualified === 'yeah' && !user.checkedIn
  }
}