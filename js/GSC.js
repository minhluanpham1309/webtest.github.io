//<editor-fold defaultstate="collapsed" desc="GOOGLE SEARCH CONSOLE">
var client;
function initClient() {
    client = google.accounts.oauth2.initTokenClient({
        client_id: '400156217563-t084gtib6dmj0fahq8e44renr731oeiq.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/webmasters',
        callback: (tokenResponse) => {
            searchConsoleQuery(tokenResponse.access_token);
        },
    });
}
function getToken() {
    client.requestAccessToken();
}

function searchConsoleQuery(access_token)
{
    var siteUrl = "https://mieru-ca.com/";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://www.googleapis.com/webmasters/v3/sites/' + encodeURIComponent(siteUrl) + '/searchAnalytics/query');
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);

    xhr.send(JSON.stringify
    ({
        "startDate": "2023-01-01",
        "endDate": "2023-06-29",
        "dimensions":[
            "PAGE"
        ],
    }));
    var arrGSCData = [];
    xhr.onload = function()
    {
        response = JSON.parse(xhr.responseText);
       // TODO
    };
}
//</editor-fold>