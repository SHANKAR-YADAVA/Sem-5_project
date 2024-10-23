import React from 'react'
import { resourcesLinks, platformLinks, communityLinks } from '../constants'
// background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
const Footer = () => {
    return (
        <>
            <div className="my-8 grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                    <h2 className="text-lg font-bold mb-4">Resources</h2>
                    <ul>
                        {resourcesLinks.map((link, index) => (
                            <li key={index}>
                                <a
                                    href={link.href}
                                    className='text-blue-300 hover:text-blue-800'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    >{link.text}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-4">Platforms</h2>
                    <ul>
                        {platformLinks.map((link, index) => (
                            <li key={index}>
                                <a
                                    href={link.href}
                                    className='text-blue-300 hover:text-blue-800'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {link.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-4">Communities</h2>
                    <ul>
                        {communityLinks.map((link, index) => (
                            <li key={index}>
                                <a
                                    href={link.href}
                                    className='text-blue-300 hover:text-blue-800'
                                    target="_blank"
                                    rel="noopener noreferrer">{link.text}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Footer