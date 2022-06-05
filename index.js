addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    let param = new URL(request.url).searchParams;
    let dday = new Date(parseInt(param.get('y')), parseInt(param.get('m')) - 1, parseInt(param.get('d')));
    let timezone = param.get('tz') ? parseInt(param.get('tz')) : 0;

    let left_milisecond = (Date.now() - dday.getTime() + (timezone * 1000 * 60 * 60));
    let left_day = Math.floor(left_milisecond / (1000 * 60 * 60 * 24));
    let sign = left_day > 0 ? '+' : '-';

    let svg = '<svg width="180" height="40" xmlns="http://www.w3.org/2000/svg">'
        + `<text x="10" y="30" font-size="30">D${sign}${Math.abs(left_day)}</text>`
        + '</svg>';

    return new Response(svg, {
        headers: {
            'content-type': 'image/svg+xml',
            'Cache-Control': `no-cache, no-store, must-revalidate`
        }
    })
}
