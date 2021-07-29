let i = 0;
const constants = {
    electron: require('electron'),
    fs: require('fs'),
    pathname: require('electron').remote.app.getAppPath()
}

const enav = new (require('electron-navigation'))({
    showBackButton : false,
    showForwardButton : false,
    showReloadButton : false,
    showUrlBar: false,
    newTabCallback: (url, options) => {
        localStorage.removeItem("PLAYER_NAME");
        i++;
        let id = "cthulhu" + i;
        url = `file:///${constants.pathname}/app/cthulhu.html`;
        options.id = id;
        options.node = true;
        options.icon = `file:///${constants.pathname}/app/images/icon.ico`;
        // options.webviewAttributes = {
        //     'console-message' : 'console.log(\'Guest page logged a message:\')'
        // };
        return {url, options};
    }
});

enav.newTab();
enav.listen("cthulhu1", console.log);