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
        url = `file:///${constants.pathname}/app/cthulhu.html`;
        options.node = true;
        options.icon = `file:///${constants.pathname}/app/images/icon.ico`;
        return {url, options};
    }
});

enav.newTab();