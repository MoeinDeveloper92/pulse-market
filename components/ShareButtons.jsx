import React from 'react'
import {
    TwitterIcon,
    TwitterShareButton,
    FacebookIcon,
    FacebookShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    EmailIcon,
    EmailShareButton
} from "react-share"


const ShareButtons = ({ property }) => {
    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
    return (
        <>
            <h3 className='text-xl text-center pt-2 font-bold '>
                Share This Property
            </h3>
            <div className="flex gap-3 justify-center pb-5">
                <FacebookShareButton
                    url={shareUrl}
                    quote={property.name}
                    hashtag={`#${property.type.replace(/\s/g, '')}ForRent`}
                >
                    <FacebookIcon
                        size={40}
                        round={true}
                    />
                </FacebookShareButton>
                <TwitterShareButton
                    title={property.name}
                    url={shareUrl}
                    hashtag={[`${property.type.replace(/\s/g, '')}ForRent`]}
                >
                    <TwitterIcon
                        size={40}
                        round={true}
                    />
                </TwitterShareButton>
                <WhatsappShareButton
                    title={property.name}
                    url={shareUrl}
                    separator=":: "
                >
                    <WhatsappIcon
                        size={40}
                        round={true}
                    />
                </WhatsappShareButton>
                <EmailShareButton
                    subject={property.name}
                    url={shareUrl}
                    body={`Check out this property listing: ${shareUrl}`}
                >
                    <EmailIcon
                        size={40}
                        round={true}
                    />
                </EmailShareButton>
            </div>
        </>
    )
}

export default ShareButtons