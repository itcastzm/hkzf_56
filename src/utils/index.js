
import API from './api';


function getCurrentCityInfo() {


    return new Promise((resolve, reject) => {

        try {

            let curCityInfo = JSON.parse(localStorage.getItem('hkzf_city_56'));

            // 判断缓存中有当前定位信息没有
            if (curCityInfo) {
                // 有
                resolve(curCityInfo);
            } else {
                // 没有
                var myCity = new window.BMap.LocalCity();

                myCity.get(async (result) => {

                    const res = await API.get(`/area/info`, {
                        params: {
                            name: result.name
                        }
                    })

                    resolve(res.data.body);
                    localStorage.setItem('hkzf_city_56', JSON.stringify(res.data.body))

                });
            }

        } catch (e) {
            reject(e);
        }

    })
}



export {
    getCurrentCityInfo
}