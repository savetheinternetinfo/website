const log = function(txt: string, err?: boolean){
    const date = new Date();
    let hour = date.getHours(),
        min  = date.getMinutes(),
        sec  = date.getSeconds();

    let hours = (hour < 10 ? "0" : "") + hour;
    let mins  = (min  < 10 ? "0" : "") + min;
    let secs  = (sec  < 10 ? "0" : "") + sec;

    let head = (err ? "[ERROR]" : "[INFO] ");

    console.log(head + " [" + hours + ":" + mins + ":" + secs + "] - " + txt);
};

export = log;
