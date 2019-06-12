
  function getSensorId(id) {

    fetch(`usuarios/?id=${id}`, {
      method: "GET"
    }).then(js => {
      return js.json();
    }).then(rs => {
      console.log(rs);
    });
    return false;
  }

  getSensorId(1);