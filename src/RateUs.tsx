import { useCallback } from "react"
import { useLocalStorage } from "usehooks-ts";

function Star({ className }: { className?: string }) {
    return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className={`w-4 h-4 transition-all ${className}`}>
        <path
            d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
        />
    </svg>)
}



function RateUs() {
    const RATING_CWS_REVIEW_URL = "https://chromewebstore.google.com/detail/TXT%20%D0%B2%20PDF/amokmpiljgblbhjilmkphhoigbobhihm/reviews";
    const RATING_FEEDBACK_FORM = "https://docs.google.com/forms/d/e/1FAIpQLSdTzoO8EJis8tBg4qWQ461jGmXbEY6MOMKUWtL1cARUV275Eg/viewform";
    
    const [, setRating] = useLocalStorage<number>("rateUsRating", 0);
    const handleFeedbackClick = useCallback((rating: number) => {
        setRating(rating);
    }, [setRating]);
    return (
        <div className="flex items-center gap-2">
            <p className="text-gray-600">
                Rate us:
            </p>
            <div className="full-stars">
                <div className="flex flex-row-reverse group">

                    <a
                        target="_blank" rel="noreferrer noopenner"
                        className="pr-1 fill-stone-200 group-has-[a:nth-child(-n+1):hover]:fill-[#ffc711] hover:scale-125 hover:drop-shadow transition duration-300"
                        href={RATING_CWS_REVIEW_URL}
                        onClick={() => handleFeedbackClick(5)}
                        
                    >
                        <Star /> {/** 5 Star */}
                    </a>

                    <a
                        target="_blank" rel="noreferrer noopenner"
                        className="pr-1 fill-stone-200 group-has-[a:nth-child(-n+2):hover]:fill-[#ffc711] hover:scale-125 hover:drop-shadow transition duration-300"
                        href={RATING_CWS_REVIEW_URL}
                        onClick={() => handleFeedbackClick(4)}
                    >
                        <Star /> {/** 4 */}
                    </a>

                    <a
                        target="_blank" rel="noreferrer noopenner"
                        className="pr-1 fill-stone-200 group-has-[a:nth-child(-n+3):hover]:fill-[#ffc711] hover:scale-125 hover:drop-shadow transition duration-300"
                        href={RATING_FEEDBACK_FORM}
                        onClick={() => handleFeedbackClick(3)}
                    >
                        <Star /> {/** 3 */}
                    </a>

                    <a
                        target="_blank" rel="noreferrer noopenner"
                        className="pr-1 fill-stone-200 group-has-[a:nth-child(-n+4):hover]:fill-[#ffc711] hover:scale-125 hover:drop-shadow transition duration-300"
                        href={RATING_FEEDBACK_FORM}
                        onClick={() => handleFeedbackClick(2)}
                    >
                        <Star /> {/** 2 */}
                    </a>

                    <a
                        target="_blank" rel="noreferrer noopenner"
                        className="pr-1 fill-stone-200 group-has-[a:nth-child(-n+5):hover]:fill-[#ffc711] hover:scale-125 hover:drop-shadow transition duration-300"
                        href={RATING_FEEDBACK_FORM}
                        onClick={() => handleFeedbackClick(1)}
                    >
                        <Star /> {/** 1 */}
                    </a>
                </div>
            </div>
        </div>
    )
}

// export const useRateUs = (tresholdEvents: number) => {
//     const [events, setEvents] = useLocalStorage<number>("rateUsTresholdEvents", 0);
//     const [rating] = useLocalStorage<number>("rateUsRating", 0);
//     const countEvent = useCallback((inc: number = 1) => {
//         setEvents(e => e + inc);
//     }, [setEvents]);
//     return {
//         countEvent,
//         isRateUsVisible: events >= tresholdEvents && !rating,
//     }
//

export default RateUs;