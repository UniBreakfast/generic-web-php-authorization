function validate(subj, checks) {
  if (Array.isArray(checks)) {
    for (let i=0, err; i<checks.length; i++) {
      if (err=validate(subj,checks[i])) return err
    }
  }
  else if (Array.isArray(subj)) {
    if (checks.sub) {
      let err = validate(subj[checks.sub-1],checks)
      if (err) return [checks.sub, err]
    }
    else {
      for (let i=0, err; i<subj.length; i++) {
        if (err=validate(subj[i],checks)) return [i+1,err]
      }
    }
  }
  else if (typeof subj=='object') {
    if (checks.sub) {
      let err = validate(subj[checks.sub],checks)
      if (err) return [checks.sub, err]
    }
    else {
      for (let sub in subj) {
        if (err=validate(subj[sub],checks)) return [sub,err]
      }
    }
  }
  else {
    const {is, not, err} = checks
    if (is && is.test(subj) || not && !not.test(subj)) return err
  }
}

// var emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/