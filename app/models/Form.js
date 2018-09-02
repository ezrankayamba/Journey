
class Form{
    constructor(dao) {
        this.dao = dao
    }
    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS forms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        vehicle_num TEXT,
        purpose TEXT,
        driver_ma INTEGER,
        long_travel INTEGER,
        remote_delay INTEGER,
        driver_name TEXT,
        department TEXT,
        line_manager TEXT)`
        return this.dao.run(sql)
    }
    create(json) {
        return this.dao.run(
        `INSERT INTO forms (vehicle_num, purpose, driver_ma, long_travel, remote_delay, driver_name, department, line_manager) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [json.vehicleNum, json.purpose, json.driverMA, json.longTravel, json.remoteDelay, json.driverName, json.department, json.lineManager]);
    }
    getAll() {
        return this.dao.all(`SELECT * FROM forms`);
    }
    delete(id) {
        return this.dao.run(`DELETE FROM forms WHERE id = ?`,    [id]);
    }
    
    list(data){
        return data.map(f => this.format(f));
    }
    format(f){
        var fm = {};
            for(var key in f){
                var value=f[key];
                  var fld=key.replace(/_([a-z])/g, function (g) { return g[1].toUpperCase(); });
                  if(key === 'id'){
                      fld='key';
                      value = value+'';
                  }
                  
                  if(['driver_ma', 'long_travel', 'remote_delay'].indexOf(key) != -1)  {  //Bool
                        value = value==1;
                  }
                 fm[fld]=value;
            }
            return fm;
    }
}

module.exports = Form;
