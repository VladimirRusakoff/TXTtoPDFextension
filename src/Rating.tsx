function Rating() {

    const hrefLink = "https://chromewebstore.google.com/detail/TXT%20%D0%B2%20PDF/amokmpiljgblbhjilmkphhoigbobhihm/reviews";
    const hrefGoogleForm = "https://docs.google.com/forms/d/e/1FAIpQLSdTzoO8EJis8tBg4qWQ461jGmXbEY6MOMKUWtL1cARUV275Eg/viewform";

    const handleClick = (url: string) => {
        if (chrome?.tabs) {
            chrome.tabs.create({ url: url });
        } else {
            window.open(url, '_blank');
        }
    };

    return (
        <>
            <style>
                {`
                .full-stars {
                    text-align: center;
                }
                .full-stars .rating-group {
                    display: inline-flex;
                }
                .full-stars input {
                    position: absolute;
                    left: -9999px;
                }
                .full-stars label {
                    margin: 0;
                    cursor: pointer;
                }
                .full-stars label a svg {
                    margin: 2px;
                    height: 30px;
                    width: 30px;
                    fill: #ff8400;
                    transition: fill 0.3s;
                }
                .full-stars input:checked ~ label a svg {
                    fill: #ffc711;
                }
                .full-stars .rating-group:hover label a svg {
                    fill: #ff8400;
                }
                .full-stars .rating-group input:hover ~ label a svg {
                    fill: #ffc711;
                }
                `}
            </style>
            <hr style={{ border: 0, borderTop: '3px solid #bbb', opacity: 0.25 }} />
            <p style={{ textAlign: 'center', fontFamily: 'arial, sans-serif', fontSize: '16px' }}>
            Rate us:
            </p>
            <div className="full-stars">
                <div className="rating-group">
                    <input name="fst" value="5" type="radio" disabled checked />
                    <label htmlFor="fst-1">
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            handleClick(hrefGoogleForm);
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path
                            d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                        />
                        </svg>
                    </a>
                    </label>
                    <input name="fst" id="fst-1" value="1" type="radio" />
                    <label htmlFor="fst-2">
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            handleClick(hrefGoogleForm);
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path
                            d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                        />
                        </svg>
                    </a>
                    </label>
                    <input name="fst" id="fst-2" value="2" type="radio" />
                    <label htmlFor="fst-3">
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            handleClick(hrefGoogleForm);
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path
                            d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                        />
                        </svg>
                    </a>
                    </label>
                    <input name="fst" id="fst-3" value="3" type="radio" />
                    <label htmlFor="fst-4">
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            handleClick(hrefLink);
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path
                            d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                        />
                        </svg>
                    </a>
                    </label>
                    <input name="fst" id="fst-4" value="4" type="radio" />
                    <label htmlFor="fst-5">
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            handleClick(hrefLink);
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path
                            d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                        />
                        </svg>
                    </a>
                    </label>
                    <input name="fst" id="fst-5" value="5" type="radio" />
                </div>
            </div>
        </>
    )
}

export default Rating;