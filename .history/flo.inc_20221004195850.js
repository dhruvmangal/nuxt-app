const API = {
    CSK: 'eb9e5c12af04ce9a285a',
    SETTING: {
        PLAYLIST_MAX_COUNT: 3000,
        INFINITY_SCROLL_GAP: 3000,
        ELECTRON_VOLUME_RATE: 0.1
    },
    
    LOCATION: {
        PROTOCOL: windowLocation.protocol,
        HOST: windowLocation.host,
        URL: currentUrl,
        SEARCH: windowLocation.search,
        URI: `${currentUrl}${windowLocation.pathname}${windowLocation.search}`,
    },
    APP_SCHEME: {
        BASE: 'flomusic',
        URL: currentUrl,
        STORE_URL: {
            IOS: 'https://goo.gl/a24U5L',
            AOS: 'https://goo.gl/bnYc7F',
        },
    },
    TID: {
        HOST: vueAppMode === 'PRODUCTION' ? 'auth' : 'auth-stg',
    },
    API_BASE_URL: isLocal ? '/api' : `${currentUrl}/api`,
    COOKIE_DOMAIN: isLocal ? '' : {domain: 'www.music-flo.com'},
    ELEMENT: {
        BODY: document.getElementsByTagName('body')[0],
        APP: document.getElementById('app'),
    },
    STRING: {
        APP_NAME: 'FLO_WEB',
        APP_VERSION: '6.7.0',
        APP_OS_TYPE: 'WEB',
        APP_OS_VERSION: getOSVersion(),
        APP_OS_MODEL: `${getOSName()}_${getBrowserName()}`,
        USER_INFO: 'FLO_UIF',
        REFRESH_TOKEN: 'FLO_RFT',
        VOLUME: 'FLO_VOL',
        REPEAT: 'FLO_RPT',
        SHUFFLE: 'FLO_SFL',
        PLAYER: 'FLO_PLY',
        PLAYLIST: 'FLO_PL',
        LAST_TRACK: 'FLO_LAST_TRACK',
        NOW_PLAYING_TRACKLIST: 'FLO_NPL',
        PLAYING_GROUP_ID: 'FLO_PGI',
        PLAY_SETTING: 'FLO_SET',
        STORAGE_CACHING: 'FLO_SCD',
        STORAGE_RECOMMEND_CACHING: 'FLO_SRCD',
        SAVED_ID: 'FLO_ID',
        INIT_POPUP: 'initPopup_',
        ELECTRON: 'FLO_ELECTRON',
        VOLUME_BEFORE_MUTE: 'VOLUME_BEFORE_MUTE',
        ELECTRON_SOCIAL_QUERY : '&electronPopupYn=Y',
        AUDIO_CONTENT: 'AUDIO-CONTENT',
        LAST_REPEAT: 'FLO_LAST_RPT',
        PLAYER_STORE: 'PLAYER_STORE',
        AUDIO_CONTENT_STORE: 'AUDIO_CONTENT_STORE'
    },
    UTILS: {
        validPluginOption: (option, mandantory) => {
            const validResult = [];
            const optionArray = Object.keys(option)
                .map((key) => { return key;});

            mandantory.forEach((item) => {
                if (optionArray.indexOf(item) === -1 || option[item] === undefined || option[item] === null) {
                    validResult.push(item);
                }
            });

            if (validResult.length > 0) {
                throw (`필수 옵션 없음 : [${validResult.join(', ')}]`);
            }
        },
        getDeviceId,
        /**
         * http://jira.skplanet.com/browse/GODMUSIC-11691
         * 위 요청으로 인해, 일렉트론에서 로그인 하는 경우에 한해 appName을 변경해야 하는 상황이 발생
         * (일렉트론에서 로그인 외 다른 요청의 경우 기존스팩으로 동작해야함.)
         */
        getAppNameOfSignIn: () => {
            return FLO.IS_ELECTRON ? 'FLO_EWEB' : FLO.STRING.APP_NAME;
        },
        /**
         * 이미지 list 에서 지정한 size 이미지 url 얻음
         * @param array img List
         * @param size default 500
         * @returns {null|*} img url
         */
        getImgUrl: (array, size) => {
            if (!array) {
                return FLO.TEMP_IMG_URL;
            }
            const _size = size || FLO.IMG_DEFAULT_SIZE;
            const _arrLength = array.length;

            if (_arrLength > 1) {
                let imgSizeIndex = array.findIndex((img) => {
                    return img.size >= _size;
                });

                return imgSizeIndex > -1 ? array[imgSizeIndex].url : array[_arrLength - 1].url;
            } else {
                return array[0] ? array[0].url : null;
            }
        },
        /**
         * route query 에서 decoded 된 clause 얻기 위한 함수
         * @param clause <String> encodeURIComponent 로 인코딩 된 clause
         * @returns {Promise<String>}
         */
        getClauseFromRoute: (clause) => {
            return new Promise((resolve) => {
                let _resClause = clause;

                while(_resClause.charAt(0) !== '[') {
                    _resClause = decodeURIComponent(_resClause);
                }

                resolve(_resClause);
            });
        },
        getEnvOfVueAppMode: () => vueAppMode,
        /**
         * substring str by length
         * @param str <String> substring 시킬 string
         * @param length <Number> substring 길이
         * @returns {string}
         */
        getStringByLength: (str, length) => {
            if (typeof length !== 'number') {
                return '[ERR] length type not Number';
            }

            return ((typeof str !== 'string') ? str.toString() : str).substring(0, length);
        }
    },
    IMG_DEFAULT_SIZE: 500,
    TEMP_IMG_URL: 'https://cdn.music-flo.com/image/album/000/000/00/00/0000000000.png/dims/resize/500x500/quality/90',
    ARTIST_FLO_URL: (() => {
        if (vueAppMode === 'DEV') {
            return 'https://dev-www.artist-flo.com';
        } else if (vueAppMode === 'QA') {
            return 'https://qa-www.artist-flo.com';
        } else {
            return 'https://www.artist-flo.com';
        }
    })(),
    IS_ELECTRON: windowLocation.search.indexOf('isElectron=true') > -1 || CookieUtils.get('FLO_ELECTRON') === 'true',
    ETC: {
        HOME_EXCEPT_TYPE: ['PREFER_ARTIST_VIDEO', 'PREFER_GENRE_VIDEO', 'BAND', 'BANNER', 'WELCOME_MSG', 'RECOMMEND_FAVORITE_ARTIST'],
        CONSOLE_RED: 'background: red; color: black; padding: 5px; font-weight:bold;',
        CONSOLE_BLUE: 'background: blue; color: white; padding: 5px; font-weight:bold;'
    }
};

export default { 
    API
};