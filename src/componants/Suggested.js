import "./Nav.css"
function Suggested() {
    return (
        < div className='disappear'>
            <div className='d-flex align-items-center'>
                <div style={{ width: "50px", height: "50px", margin: "20px" }}>
                    <img style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} src='https://th.bing.com/th/id/R.8e6b2a99a123467536625076e679eb1e?rik=qvx2WNWV3QXUCA&riu=http%3a%2f%2fvteamlabs.com%2fwp-content%2fuploads%2f2018%2f10%2fAmazon-logo.png&ehk=E7wPx0juTW3wXo0jadzXzBAobdn%2fzgoGxRKn30zbCOU%3d&risl=&pid=ImgRaw&r=0' alt='story' />
                </div>
                <div className=''>
                    <span className='fw-bolder p-1'>Amazon.de</span>
                </div>
            </div>
            <div>
                <img src='https://m.media-amazon.com/images/I/71U-Q+N7PXL._SX3000_.jpg' className='w-100' alt='' />
            </div>
            <div className='d-flex align-items-center'>
                <div style={{ width: "50px", height: "50px", margin: "20px" }}>
                    <img style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} src='https://yt3.ggpht.com/a-/AN66SAzDYdcU0mThjNiDpp_2t_1KK0bOAXVN2X09-w=s900-mo-c-c0xffffffff-rj-k-no' alt='story' />
                </div>
                <div className=''>
                    <span className='fw-bolder p-1'>Vodafone.de</span>
                </div>
            </div>
            <div>
                <img src='https://cached.imagescaler.hbpl.co.uk/resize/scaleHeight/815/cached.offlinehbpl.hbpl.co.uk/news/OMC/Vodafone_2.jpg' className='w-100' alt='' />
            </div>
        </div>
    )
}

export default Suggested