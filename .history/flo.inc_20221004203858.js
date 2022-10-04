import {http} from './modules/axios/index'

const isLocal = true;
const vueAppMode = process.env.VUE_APP_MODE;

const FLO = {
    
    API_BASE_URL: isLocal ? '/api' : `${currentUrl}/api`,
    TID: {
        HOST: vueAppMode === 'PRODUCTION' ? 'auth' : 'auth-stg',
    },
    APP_SCHEME: {
        BASE: 'flomusic',
        //URL: currentUrl,
        STORE_URL: {
            IOS: 'https://goo.gl/a24U5L',
            AOS: 'https://goo.gl/bnYc7F',
        },
    },
};
const getDefaultHeader = async () => {
    return {
        'x-gm-app-version': FLO.STRING.APP_VERSION,
        'x-gm-os-type': FLO.STRING.APP_OS_TYPE,
        'x-gm-app-name': FLO.STRING.APP_NAME, // 로그인 과정에서 일렉트론의 경우 해당 정보를 치환함, 통계측과 확인하여, 해당 정보를 일관되도록 변경해도 이슈 없다면 다시 constHeader 로 이동
        'x-gm-device-id': await FLO.UTILS.getDeviceId(), // player에서 store.poc.deviceid 정보로 치환하는 로직이 있음 히스트로 확인 후 이슈 없다면 다시 constHeader 로 이동
    };
};
const getConstHeader = async () => {
    return {
        'x-gm-os-version': FLO.STRING.APP_OS_VERSION,
        'x-gm-device-model': FLO.STRING.APP_OS_MODEL,
        'x-gm-access-token': await getAuthToken()
    };
};

const isValidHeader = (constHeader, requestHeader) => {
    const constHeaderLength = Object.keys(constHeader).length;
    const requestHeaderLength = Object.keys(requestHeader).length;
    const combineHeaderLength = Object.keys(Object.assign({}, constHeader, requestHeader)).length;
    return (constHeaderLength + requestHeaderLength) === combineHeaderLength;
};


const getApiHeader = async (...requestHeader) => {
    const combineHeader = Object.assign({}, await getDefaultHeader(), ...requestHeader);
    const constHeader = await getConstHeader();

    if ( isValidHeader(constHeader, combineHeader) ) {
        return Object.assign({}, constHeader, combineHeader);
    } else {
        throw Error('Invalid combineHeader: ' + combineHeader);
    }
};

export const API = {
    /**
     * @description API URI
     */
    URI: {
        AUTH: {
            GET_TOKEN: FLO.API_BASE_URL + '/auth/v1/devtool/token',
            VERIFY_TOKEN: FLO.API_BASE_URL + '/auth/v1/token',
            SMS_REQUEST: FLO.API_BASE_URL + '/auth/v1/sms/request',
            SMS_VERIFY: FLO.API_BASE_URL + '/auth/v1/sms/verify',
            SIGNIN: FLO.API_BASE_URL + '/auth/v3/sign/in',
            SIGNUP: FLO.API_BASE_URL + '/auth/v2/sign/up',
            REFRESH_TOKEN: FLO.API_BASE_URL + '/auth/v1/sign/in/refresh',
            ENCRYPT_CLIENT_SECRET: FLO.API_BASE_URL + '/auth/v1/tid/encryptClientSecret',
            CHAGE_PASSWORD: FLO.API_BASE_URL + '/auth/v1/auth/change/password',
            MINORS_IDENTITY: FLO.API_BASE_URL + '/auth/v1/auth/identity',
            AVAILABILE_CHECK_ID: FLO.API_BASE_URL + '/auth/v1/sign/id/available',
            FIND_MEMBER: FLO.API_BASE_URL + '/auth/v1/sign/find/member',
            SYNC_SKT_MEMBER: FLO.API_BASE_URL + '/auth/v1/skt/sync',
            TID_VALIDATION_TOKEN: FLO.API_BASE_URL + '/auth/v1/tid/validateToken',
            SIGN_OUT: FLO.API_BASE_URL + '/auth/v1/sign/out',
            WITHDRAW: FLO.API_BASE_URL + '/auth/v1/sign/withdraw',
            SNS_LINK: FLO.API_BASE_URL + '/auth/v1/sns/link',
            KMC_ENCRYPT: FLO.API_BASE_URL + '/auth/v1/kmc/encrypt',
            KMC_VERIFY: FLO.API_BASE_URL + '/auth/v1/kmc/verification'
        },
        MEMBER: {
            VERIFY_PASSWORD: FLO.API_BASE_URL + '/member/v1/members/verify/password',
            INFO: FLO.API_BASE_URL + '/member/v1/members',
            CHARACTERS: FLO.API_BASE_URL + '/member/v1/members/characters',
            DISCOVERY: FLO.API_BASE_URL + '/member/v1/members/characters/discovery',
            CLAUSE_LIST: FLO.API_BASE_URL + '/member/v1/clause/list',
            SNS_LINK: FLO.API_BASE_URL + '/member/v1/members/sns',
            CLAUSE: FLO.API_BASE_URL + '/member/v1/clause',
        },
        DISPLAY: {
            HOME_LAYOUT: FLO.API_BASE_URL + '/display/v2/home/layout',
            INIT_POPUP: FLO.API_BASE_URL + '/display/v1/information/popup/init/list',
            FLOATING_POPUP: FLO.API_BASE_URL + '/display/v1/information/popup/floating/list',
            TPO: FLO.API_BASE_URL + '/display/v1/home/tpo',
            LISTEN_RECENT: FLO.API_BASE_URL + '/display/v1/home/recent',
            SHORTCUT: FLO.API_BASE_URL + '/display/v1/home/shortcut',
            EDITORS_PIC: FLO.API_BASE_URL + '/display/v1/home/editorPick',
            BANNER: FLO.API_BASE_URL + '/display/v2/banners/HOME/list',
            BAND_BANNER: FLO.API_BASE_URL + '/display/v2/banners/BAND/list',
            BROWSE: FLO.API_BASE_URL + '/display/v1/browser',
            BROWSE_HOME: FLO.API_BASE_URL + '/display/v3/browser/main',
            BROWSE_GENRE: FLO.API_BASE_URL + '/display/v1/browser/genre',
            BROWSE_PROGRAM: FLO.API_BASE_URL + '/display/v1/browser/program/category',
            ARTIST_AND_FLO_PICK: FLO.API_BASE_URL + '/display/v2/home/afloChnl/list',
            PREVIOUS_EDITORS_PICK: FLO.API_BASE_URL + '/display/v1/home/editors-pick/channel/previous-list',
        },
        SEARCH: {
            BY_TYPE: FLO.API_BASE_URL + '/search/v2/search',
            INTEGRATION: FLO.API_BASE_URL + '/search/v2/search/integration',
            INSTANT_WORD: FLO.API_BASE_URL + '/search/v2/search/instant',
            DEFAULT_KEYWORD: FLO.API_BASE_URL + '/search/v2/search/keyword',
        },
        META: {
            BASE: FLO.API_BASE_URL + '/meta/v1',
            CHANNEL: FLO.API_BASE_URL + '/meta/v1/channel',
            ALBUM: FLO.API_BASE_URL + '/meta/v1/album',
            ARTIST: FLO.API_BASE_URL + '/meta/v1/artist',
            TRACK: FLO.API_BASE_URL + '/meta/v1/track',
            EPISODE: FLO.API_BASE_URL + '/meta/v1/audio/episode',
            PROGRAM: FLO.API_BASE_URL + '/meta/v1/audio/program',
            CHART: FLO.API_BASE_URL + '/meta/v1/chart/track', // 아래 POPULARITY 로 조회한 ID 로 트랙 목록 조회
            POPULARITY: FLO.API_BASE_URL + '/meta/v1/chart/popularity', // 둘러보기 category 목록 조회,
            GENRE_BROWSE: FLO.API_BASE_URL + '/meta/v1/genre/browser', // 브라우즈 메인 전시 장르
            AGENCY_BLACKLIST: FLO.API_BASE_URL + '/meta/v1/agency/blacklist', // 유통사 블랙리스트
        },
        PERSONAL: {
            GENRE: FLO.API_BASE_URL + '/personal/v1/preferences/genres',
            PANEL: FLO.API_BASE_URL + '/personal/v1/recommends',
            RECOMMEND: FLO.API_BASE_URL + '/personal/v2/recommends/home/panels',
            ARTIST: FLO.API_BASE_URL + '/personal/v1/preferences/artists',
            CHANNEL: FLO.API_BASE_URL + '/personal/v1/channels',
            TRACK: FLO.API_BASE_URL + '/personal/v1/tracks',
            MY_PLAYLIST: FLO.API_BASE_URL + '/personal/v1/myplaylist',
            LIKE: FLO.API_BASE_URL + '/personal/v1/like',
            LIKE_STATUS_TRACK: FLO.API_BASE_URL + '/personal/v2/like/tracks', // 트랙일 경우만 v2로 상태 조회
            LIKE_STATUS_EPISODE: FLO.API_BASE_URL + '/personal/v1/like/type/AUDIO_EP/ids',
            LIKE_STATUS_PROGRAM: FLO.API_BASE_URL + '/personal/v1/like/type/AUDIO_PG/ids',
            DISLIKE: FLO.API_BASE_URL + '/personal/v1/dislike/tracks', // 이 곡 안듣기
            PIN: FLO.API_BASE_URL + '/personal/v1/myplaylist/pin',
            MOST_LISTEN: FLO.API_BASE_URL + '/personal/v1/tracks/mostlistened',
            RECENT_LISTEN: FLO.API_BASE_URL + '/personal/v1/tracks/recentlistened',
            RECENT_LISTEN_AUDIO: FLO.API_BASE_URL + '/personal/v1/audio/recentlistened',
            RECENT_LISTEN_LIST: FLO.API_BASE_URL + '/personal/v1/channels/recentListened',
            CHANNEL_LOG: FLO.API_BASE_URL + '/personal/v1/listen/channel', // 채널을 플레이리스트에 "담을때" 입니다. 채널내 1곡 플레이시에는 호출하지 않습니다. (Kats 김응학)
            LISTEN_LOG: FLO.API_BASE_URL + '/personal/v1/listen/resource',
            RECOMMEND_PANEL: FLO.API_BASE_URL + '/personal/v2/recommends/panel/list',
            AFLO_CHANNLE_PANEL: FLO.API_BASE_URL + '/personal/v1/channels/afloChnl/list',
            RECOMMEND_FAVE_ALBUM: FLO.API_BASE_URL + '/personal/v1/recommends/favorites/albums',
            RECOMMEND_CABINET: FLO.API_BASE_URL + '/personal/v1/recommends/cabinet',
            CURATION_LIST: FLO.API_BASE_URL + '/personal/v1/curations',
            PANEL_VIEW_LOG: FLO.API_BASE_URL + '/personal/v1/home/panel/view',
            OPERATION_TPO: FLO.API_BASE_URL + '/personal/v1/tpo/operation',
            AUDIO_NOTICE: FLO.API_BASE_URL + '/personal/v1/like/audio/notice',
            APPRECIATION_PROGRAM: FLO.API_BASE_URL + '/personal/v1/audio/listening'
        },
        CHARTNCHANNEL: {
            JUMP: FLO.API_BASE_URL + '/chartnchannel/jump/v1/channels',
            HOME_JUMP: FLO.API_BASE_URL + '/chartnchannel/jump/v1/recommends',
            AUDIO_PROGRAM_CHART: FLO.API_BASE_URL + '/chartnchannel/v1/chart/audio/programs/top-n',
        },
        PURCHASE: {
            TOKEN: FLO.API_BASE_URL + '/purchase/v2/token',
            TAB_LIST: FLO.API_BASE_URL + '/purchase/v1/tab',
            RECOMMEND: FLO.API_BASE_URL + '/purchase/v1/recommend',
            VOUCHER: FLO.API_BASE_URL + '/purchase/v1/general',
            SKT: FLO.API_BASE_URL + '/purchase/v1/benefits',
            SKT_FREE_VOUCHER: FLO.API_BASE_URL + '/purchase/v1/benefit/voucher',
            CHECK_FAIL_PASS: FLO.API_BASE_URL + '/purchase/v1/fail',
            AVAILABILITY: FLO.API_BASE_URL + '/purchase/v2/availability',
            MY_HISTORY: FLO.API_BASE_URL + '/purchase/v1/history',
            CHECK_COUPON: FLO.API_BASE_URL + '/purchase/v2/coupon',
            REGIST_COUPON: FLO.API_BASE_URL + '/purchase/v1/coupon/regist',
            MANAGE_VOUCHER_LIST: FLO.API_BASE_URL + '/purchase/v2/closable/pass/list',
            PRODUCT: FLO.API_BASE_URL + '/purchase/v1/product',
            SKT_FREE: FLO.API_BASE_URL + '/purchase/v1/free',
            ARTIST_FLO_LIST: FLO.API_BASE_URL + '/purchase/v1/artists',
            ARTIST_FLO_DETAIL: FLO.API_BASE_URL + '/purchase/v1/artist',
            ALLIANCE: FLO.API_BASE_URL + '/purchase/v1/alliance'
        },
        ORDER: {
            // 단품
            ORDER: FLO.API_BASE_URL + '/order/v2/single/form',
            ORDER_PLACE: FLO.API_BASE_URL + '/order/v2/single/options',
            VOUCHER_CHANGE_INFO: FLO.API_BASE_URL + '/order/v2/single/change/form',
            VOUCHER_CHANGE_INFO_PLACE: FLO.API_BASE_URL + '/order/v2/single/change/options',
            // 결합상품
            ORDER_COMBINE: FLO.API_BASE_URL + '/order/v2/combine/form',
            ORDER_PLACE_COMBINE: FLO.API_BASE_URL + '/order/v2/combine/options',
            VOUCHER_CHANGE_INFO_COMBINE: FLO.API_BASE_URL + '/order/v2/combine/change/form',
            VOUCHER_CHANGE_INFO_PLACE_COMBINE: FLO.API_BASE_URL + '/order/v2/combine/change/options',
            // 공통
            SKT_CARD: FLO.API_BASE_URL + '/order/v1/agency/tmembership/card',
            SKT_CARD_REMAIN: FLO.API_BASE_URL + '/order/v1/agency/tmembership/remainCount',
            TMEMBERSHIP_INFO: FLO.API_BASE_URL + '/order/v1/tmembership',
            CHECK_TMEMBERSHIP: FLO.API_BASE_URL + '/order/v1/tmembership/confirm',
            ADJUST_TMEMBERSHIP: FLO.API_BASE_URL + '/order/v1/tmembership/apply',
            ORDER_RECOVERY: FLO.API_BASE_URL + '/order/v1/autopayment/recovery',
            VOUCHER_TERMINATION: FLO.API_BASE_URL + '/order/v1/autopayment/cancel',
            CANCEL_RECOVERY: FLO.API_BASE_URL + '/order/v1/autopayment/cancel/confirm',
            CHECK_CANCEL_BENEFIT: FLO.API_BASE_URL + '/order/v1/autopayment/cancel/benefit'
        },
        PAYMENT: {
            METHOD_CHANGE: FLO.API_BASE_URL + '/payment/v2/method-change/form',
            METHOD_CHANGE_PLACE: FLO.API_BASE_URL + '/payment/v2/method-change/options',
            RESTORATION : FLO.API_BASE_URL + '/payment/v2/restoration/form',
            RESTORATION_PLACE: FLO.API_BASE_URL + '/payment/v2/restoration/options',
            RESTORATION_AVAILABLE: FLO.API_BASE_URL + '/payment/v1/restoration/availability',
            AGENCY: FLO.API_BASE_URL + '/payment/v1/agency',
            //RESPONSE_URL: FLO.APP_SCHEME.URL + '/?menu=payment-done',
            APPROVE: FLO.API_BASE_URL + '/payment/v1/approve',
            RESULT: FLO.API_BASE_URL + '/payment/v1/result',
            VOUCHER_REFUND: FLO.API_BASE_URL + '/purchase/v1/pass/refund',
            CHECK_HIDDEN_VOUCHER: FLO.API_BASE_URL + '/purchase/v1/hidden/voucher'
        },
        MEMBERSHIP: {
            FIND: FLO.API_BASE_URL + '/order/v2/tmembership/card/find',
            SAVE: FLO.API_BASE_URL + '/order/v2/tmembership/card/save',
            CHECKPIN: FLO.API_BASE_URL + '/order/v2/tmembership/card/check-pin',
            BENEFIT: FLO.API_BASE_URL + '/order/v2/tmembership/benefit-information',
            MANUAL_BENEFIT: FLO.API_BASE_URL + '/order/v2/tmembership/manual-application/benefit-information',
            MANUAL_APPLY: FLO.API_BASE_URL + '/order/v2/tmembership/manual-application/apply',
            MANUAL_CANCEL: FLO.API_BASE_URL + '/order/v2/tmembership/manual-application/cancel',
        },
        HELP: {
            NOTICE: FLO.API_BASE_URL + '/display/v1/information/notice/list',
            FAQ: {
                CATEGORY: FLO.API_BASE_URL + '/display/v1/information/faq/category/list',
                LIST: FLO.API_BASE_URL + '/display/v1/information/faq',
            },
            INQUIRY: {
                WRITE: FLO.API_BASE_URL + '/member/v1/qna/1on1',
                LIST: FLO.API_BASE_URL + '/member/v1/qna/1on1/list',
            },
        },
        STREAM: {
            LISTEN: FLO.API_BASE_URL + '/stream/v1/resource',
            PERMISSION: FLO.API_BASE_URL + '/stream/v1/listen/permission',
        },
        COMMON: {
            SHARE: FLO.API_BASE_URL + '/common/v1/sharing/url',
            ELECTRON_DOWNLOAD: FLO.API_BASE_URL + '/external/v1/electron/release',
            SERVER_TIME: FLO.API_BASE_URL + '/common/v1/server/time'
        },
        PROMOTION: {
            AVAILABLE_TERMINAION_DEFENCE: FLO.API_BASE_URL + '/order/v1/autopayment/cancel/benefit',
            ADJUST_TERMINAION_DEFENCE: FLO.API_BASE_URL + '/purchase/v1/hidden/application',
            MOVING_BENEFIT_TARGET: FLO.API_BASE_URL + '/purchase/v1/promotion/target',
            INVITE_INFO: FLO.API_BASE_URL + '/purchase/v1/promotion/recommender',
            PARTICIPATION_HISTORY: FLO.API_BASE_URL + '/purchase/v1/promotion/participation/history',
            UPLOAD_IMAGE: FLO.API_BASE_URL + '/member/v1/promotion/mytaste/upload/image',
            DRM_MIGRATION_PROMOTION: FLO.API_BASE_URL + '/purchase/v1/drm',
            CMS_PROMOTION: FLO.API_BASE_URL + '/promotion/v1/meta',
            CREATOR_PROGRAMS: FLO.API_BASE_URL + '/promotion/v1/creator-studio/creator-programs',
            CREATOR_AVAIL: FLO.API_BASE_URL + '/promotion/v1/creator-studio/check-apply',
            CREATOR_APPLY: FLO.API_BASE_URL + '/promotion/v1/creator-studio/apply',
        },
        EXTERNAL: {
            //FLO_CALLBACK_URL: `${EXTERNAL_REDIRECT_URL}/payment/affiliate/bridge`,
            //WAVVE_SIGNIN_URL: wavveUrl[vueAppMode]
        }
    },
    /**
     * @param url {string} [Mandatory] Parameter 포함한 URL
     * @param header {object} Headers
     * @returns {Promise<*>}
     */
    async GET(url, header = {}, timeout) {
        let _header = await getApiHeader(header);

        return new Promise(async (resolve, reject) => {
            
            const CancelToken = httpCancelToken;
            const source = CancelToken.source();

            if (timeout) {
                http.defaults.timeout = timeout;
            }
            http.get(url, {
                cancelToken: source.token,
                headers: _header,
            }).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    },

    /**
     * @param url {string} [Mandatory] Parameter 포함한 URL
     * @param body {object} POST BODY
     * @param header {object} Headers
     * @param contentType {string} POST BODY Content-type (기본값 : application/json)
     * @param timeout {number} POST Timeout
     * @returns {Promise<*>}
     */
    async POST(url, body, header = {}, contentType, timeout) {
        let _header = await getApiHeader(header, {
            'Content-Type': contentType ? contentType : 'application/json',
        });

        const _data = contentType === 'multipart/form-data' ? body : JSON.stringify(body);

        return new Promise((resolve, reject) => {
            http.post(url, _data, {
                timeout: timeout !== undefined ? timeout : 10000,
                headers: _header,
            }).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    },
    /**
     * @param url {string} [Mandatory] Parameter 포함한 URL
     * @param params {object} POST BODY
     * @param header {object} Headers
     * @returns {Promise<*>}
     */
    async PUT(url, params, header = {}) {
        let _header = await getApiHeader(header, {
            'Content-Type': 'application/json',
        });

        const _data = JSON.stringify(params);

        return new Promise((resolve, reject) => {
            http.put(url, _data, {
                headers: _header,
            }).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    },
    /**
     * @param url {string} [Mandatory] Parameter 포함한 URL
     * @param data {object} DELETE BODY
     * @param header {object} Headers
     * @returns {Promise<*>}
     */
    async DELETE(url, data, header = {}) {
        let _header = await getApiHeader(header, {
            'Content-Type': 'application/json',
        });

        return new Promise((resolve, reject) => {
            http.delete(url, {
                headers: _header,
                data: JSON.stringify(data),
            }).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    },
};

