import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Spinner from './Spinner';
import NewsItem from './NewsItem'
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios';

export default function News(props) {

    // const [articles, setArticles] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [page, setPage] = useState(1);
    // const [totalResults, setTotalResults] = useState(0);

    const capitalize = () => {
        let word = props.category;
        let capital = word.charAt(0).toUpperCase() + word.slice(1);
        return capital;
    }

    const myArticles = [
        {
            "source": {
                "id": null,
                "name": "Chicago Tribune"
            },
            "author": "Chicago Tribune",
            "title": "Nicholas Lloyd Webber, son of famed composer, dies at 43 - Chicago Tribune",
            "description": "Nicholas Lloyd Webber, the Grammy-nominated composer, record producer and eldest son of Andrew Lloyd Webber, died in England after a protracted battle with gastric cancer and pneumonia. He was 43.",
            "url": "https://www.chicagotribune.com/entertainment/ct-ent-nicholas-lloyd-webber-dies-20230327-4gpnrcahkbbw3pdyjfho3nldie-story.html",
            "urlToImage": "https://www.chicagotribune.com/resizer/_geIcjOFaDDbYE9N4qmyqXMN5T8=/1200x630/filters:format(jpg):quality(70):focal(607x412:617x422)/cloudfront-us-east-1.images.arcpublishing.com/tronc/QU2X2JMLTJB7VO7VBGI3PNLCWQ.jpg",
            "publishedAt": "2023-03-27T16:26:06Z",
            "content": "NEW YORK — Nicholas Lloyd Webber, the Grammy-nominated composer, record producer and eldest son of Andrew Lloyd Webber, died Saturday in England after a protracted battle with gastric cancer and pneu… [+1091 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "YouTube"
            },
            "author": null,
            "title": "Batman: The Doom That Came to Gotham: Exclusive Clip (2023) David Giuntoli, Navid Negahban - IGN",
            "description": null,
            "url": "https://www.youtube.com/watch?v=bOyUZXjjhnA",
            "urlToImage": null,
            "publishedAt": "2023-03-27T16:00:32Z",
            "content": "Your browser isnt supported anymore. Update it to get the best YouTube experience and our latest features. Learn more\r\nRemind me later"
        },
        {
            "source": {
                "id": null,
                "name": "Daily Mail"
            },
            "author": "Ellie Phillips",
            "title": "Marisa Abela transforms into Amy Winehouse while filming Back To Black in NYC - Daily Mail",
            "description": "For the scenes, the Industry actress slipped into a check basque style top with her red and black bra on view at its edges, and tied a white belt around her hips",
            "url": "https://www.dailymail.co.uk/tvshowbiz/article-11907659/Marisa-Abela-transforms-Amy-Winehouse-filming-Black-NYC.html",
            "urlToImage": "https://i.dailymail.co.uk/1s/2023/03/27/16/69165525-0-image-a-126_1679932768941.jpg",
            "publishedAt": "2023-03-27T16:00:04Z",
            "content": "Marisa Abela transformed into Amy Winehouse in denim hot pants as she strutted through NYC in animal print stilettos, while filming Back To Black, on Sunday. \r\nFor the scenes, the Industry actress sl… [+3964 chars]"
        },
        {
            "source": {
                "id": "cnn",
                "name": "CNN"
            },
            "author": "Lauren Said-Moorhouse, Max Foster",
            "title": "Prince Harry back in London for UK High Court fight - CNN",
            "description": "Britain's Prince Harry has arrived at London's High Court to attend a hearing in his claim against Associated Newspapers Limited over allegations of unlawful information gathering.",
            "url": "https://www.cnn.com/2023/03/27/uk/prince-harry-court-intl/index.html",
            "urlToImage": "https://media.cnn.com/api/v1/images/stellar/prod/230327103821-01-prince-harry-court-london-032723.jpg?c=16x9&q=w_800,c_fill",
            "publishedAt": "2023-03-27T15:36:00Z",
            "content": "Britains Prince Harry has arrived at Londons High Court to attend a hearing in his claim against Associated Newspapers Limited over allegations of unlawful information gathering.\r\nThe Duke of Sussex … [+4537 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "YouTube"
            },
            "author": null,
            "title": "Watch Live: Gwyneth Paltrow ski collision trial enters second week of testimony | CBS News - CBS News",
            "description": null,
            "url": "https://www.youtube.com/watch?v=15TWNzVIgvI",
            "urlToImage": null,
            "publishedAt": "2023-03-27T15:28:07Z",
            "content": "Your browser isnt supported anymore. Update it to get the best YouTube experience and our latest features. Learn more\r\nRemind me later"
        },
        {
            "source": {
                "id": null,
                "name": "Hollywood Reporter"
            },
            "author": "Josh Wigler",
            "title": "‘Succession’ Star Jeremy Strong Plants “Seeds of Destruction” in Final Season Premiere - Hollywood Reporter",
            "description": "The Emmy-winning actor tells The Hollywood Reporter about the dark storms ahead for Kendall Roy: \"Just when I thought I couldn't go any lower, enter season four.\"",
            "url": "https://www.hollywoodreporter.com/tv/tv-features/succession-season-4-jeremy-strong-kendall-roy-interview-1235359231/",
            "urlToImage": "https://www.hollywoodreporter.com/wp-content/uploads/2023/03/strong.jpg?w=1024",
            "publishedAt": "2023-03-27T15:20:45Z",
            "content": "(This story contains spoilers for the final season premiere of Succession, “The Munsters.”)\r\nKendall Roy (Jeremy Strong) isn’t alone anymore. After a turbulent ride through three seasons of HBO’s Suc… [+7674 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "YouTube"
            },
            "author": null,
            "title": "Cowboys and Rustlers - Official Announcement Trailer - IGN",
            "description": null,
            "url": "https://www.youtube.com/watch?v=FDunfgA7nsc",
            "urlToImage": null,
            "publishedAt": "2023-03-27T15:00:15Z",
            "content": "Your browser isnt supported anymore. Update it to get the best YouTube experience and our latest features. Learn more\r\nRemind me later"
        },
        {
            "source": {
                "id": null,
                "name": "Gizmodo.com"
            },
            "author": "Linda Codega",
            "title": "Dungeons & Dragons: Honor Among Thieves Leaves Us Wanting More - Gizmodo",
            "description": "Directors Jonathan Goldstein and John Francis Daley have pulled together an earnestly funny swords-and-sorcery film worth adventuring out to see.",
            "url": "https://gizmodo.com/dungeons-dragons-honor-among-thieves-dnd-movie-review-1850268143",
            "urlToImage": "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/bb7b638fadd888485dd00e5161677de8.jpg",
            "publishedAt": "2023-03-27T14:45:00Z",
            "content": "In spite of a rocky first third, Dungeons &amp; Dragons: Honor Among Thieves is a delightful, if slightly unsurprising, swords and sorcery film that balances the goofball antics of playing tabletop r… [+7175 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Rolling Stone"
            },
            "author": "Rob Sheffield",
            "title": "The Debut Album From Boygenius Is Even Better Than Everyone Had Hoped - Rolling Stone",
            "description": "Something weird, unpredictable, and slightly dangerous happens when Julien Baker, Phoebe Bridgers, and Lucy Dacus meld their distinct songwriting voices",
            "url": "https://www.rollingstone.com/music/music-album-reviews/boygenius-the-record-1234704024/",
            "urlToImage": "https://www.rollingstone.com/wp-content/uploads/2023/01/boygenius-new-press.jpg?w=1600&h=900&crop=1",
            "publishedAt": "2023-03-27T14:35:25Z",
            "content": "Music history is full of supergroups, but there’s never been one like boygenius, which is why the label doesn’t do them justice. They’re simply a world-beatingly great band, with three of the most br… [+5919 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Billboard"
            },
            "author": "Dave Brooks",
            "title": "Madonna Adds Nashville Tour Date and Calls Out Anti-LGBTQ+ State Laws: Don’t ‘F With a Drag Queen’ - Billboard",
            "description": "The music icon’s Celebration Tour with opener Bob the Drag Queen grows to 80 dates in North America and Europe.",
            "url": "https://www.billboard.com/music/music-news/madonna-nashville-tour-date-celebration-anti-lgbtq-state-laws-1235292871/",
            "urlToImage": "https://www.billboard.com/wp-content/uploads/2023/01/madonna-2023-cr-ricardo-gomes-1548.jpg?w=1024",
            "publishedAt": "2023-03-27T14:04:48Z",
            "content": "Pop icon Madonna won’t allow a troubling trend of state legislation targeting the LGBTQ+ community impede her career-spanning Celebration Tour, announcing plans to perform in Nashville just weeks aft… [+2933 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Rolling Stone"
            },
            "author": "Tony Ortega",
            "title": "She Escaped Scientology in the Trunk of a Car. Her Nightmare Is Far From Over. - Rolling Stone",
            "description": "Valerie Haney opens up about her years-long battle with the Church of Scientology, and how the court is forcing her into “religious arbitration”",
            "url": "https://www.rollingstone.com/culture/culture-features/valerie-haney-scientology-escape-car-trunk-religious-arbitration-david-miscavige-tom-cruise-elisabeth-moss-1234703982/",
            "urlToImage": "https://www.rollingstone.com/wp-content/uploads/2023/03/ValHaney3.jpeg?w=1600&h=900&crop=1",
            "publishedAt": "2023-03-27T14:00:00Z",
            "content": "“I’m literally shaking right now as I’m talking to you,” Valerie Haney says, speaking by phone from Florida.\r\nHer 22 years in Scientology’s hardcore elite unit, the Sea Organization, has left her wit… [+18286 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Variety"
            },
            "author": "Zack Sharf",
            "title": "‘John Wick’ Producer Says ‘Chapter 4’ Ending Is ‘Ambiguous’: ‘We Don’t Have This Answer’ About [SPOILER] - Variety",
            "description": "SPOILER ALERT: Spoilers are ahead for “John Wick: Chapter 4,” now playing in theaters. Is John Wick really dead? The end of “John Wick: Chapter 4” throws fans of the long-running a…",
            "url": "https://variety.com/2023/film/news/john-wick-dead-chapter-4-ending-ambiguous-1235565145/",
            "urlToImage": "https://variety.com/wp-content/uploads/2023/03/John-Wick-1.jpg?w=1000&h=562&crop=1",
            "publishedAt": "2023-03-27T13:54:00Z",
            "content": "SPOILER ALERT: Spoilers are ahead for “John Wick: Chapter 4,” now playing in theaters.\r\nIs John Wick really dead? The end of “John Wick: Chapter 4” throws fans of the long-running action franchise a … [+2454 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "New York Post"
            },
            "author": "Samantha Ibrahim",
            "title": "Brooke Shields: Andre Agassi smashed his trophies when I licked Matt LeBlanc - New York Post ",
            "description": "Shields made a career-changing cameo in a 1996 episode of “Friends” — but it propelled her then-husband Andre Agassi into a violent, destructive fit of rage.",
            "url": "https://nypost.com/2023/03/27/brooke-shields-agassi-got-violent-as-i-licked-matt-leblanc/",
            "urlToImage": "https://nypost.com/wp-content/uploads/sites/2/2023/03/NYPICHPDPICT000008844013.jpg?quality=75&strip=all&w=1024",
            "publishedAt": "2023-03-27T13:42:00Z",
            "content": "Brooke Shields made a career-changing cameo in a 1996 episode of “Friends” but it propelled her then-husband Andre Agassi into a violent, destructive fit of rage.\r\nIn “The One After the Super Bowl” e… [+2991 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Yahoo Entertainment"
            },
            "author": "Karolina",
            "title": "Vanderpump Rules Stars Tom Sandoval And Raquel Leviss Grab Dinner After Reunion - Yahoo Entertainment",
            "description": "Scandoval does dinner! Nothing says zero regrets like shamelessly showing your face in an intimate setting with your illicit lover. Ordering oysters is a...",
            "url": "https://www.yahoo.com/entertainment/vanderpump-rules-stars-tom-sandoval-133500301.html",
            "urlToImage": "https://media.zenfs.com/en/reality_tea_694/1eb5ef3f431a70bf0c5e34bdbf9ff714",
            "publishedAt": "2023-03-27T13:35:00Z",
            "content": "VANDERPUMP RULES -- Pictured: (l-r) Raquel Leviss, Tom Sandoval, Ariana Madix -- (Photo by: Nicole Weingart/Bravo)\r\nScandoval does dinner! Nothing says zero regrets like shamelessly showing your face… [+2659 chars]"
        },
        {
            "source": {
                "id": "cbs-news",
                "name": "CBS News"
            },
            "author": "Christopher Brito",
            "title": "Jeremy Renner shares video of him walking again after snowplow accident - CBS News",
            "description": "Renner is seen walking slowly on an antigravity treadmill, nearly three months after the accident.",
            "url": "https://www.cbsnews.com/news/jeremy-renner-snow-plow-accident-update/",
            "urlToImage": "https://assets3.cbsnewsstatic.com/hub/i/r/2023/03/27/025833fb-a33e-4762-9c19-5c6a67be1945/thumbnail/1200x630/9cab9d1e1ffb5bd13c6b583dd73a4e24/gettyimages-1354989348.jpg",
            "publishedAt": "2023-03-27T13:24:20Z",
            "content": "Jeremy Renner gave fans a new update on his recovery on Sunday, nearly three months after he was injured in a snowplow accident. The \"Avengers\" star posted a clip on his social media accounts showing… [+1314 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "New York Post"
            },
            "author": "Brooke Steinberg",
            "title": "Justine Bateman confronts obsession with her 'old' face: 'I don't give s--t' - New York Post ",
            "description": "The “Family Ties” star is getting older, and she doesn’t care what people think. “I just don’t give a s—t. I think I look rad. I think my face represents who I am. I like it.”",
            "url": "https://nypost.com/2023/03/27/justine-bateman-confronts-fans-obsession-with-her-old-face/",
            "urlToImage": "https://nypost.com/wp-content/uploads/sites/2/2023/03/justine-bateman-face-wrinkles-comp-2.jpg?quality=75&strip=all&w=1024",
            "publishedAt": "2023-03-27T13:04:00Z",
            "content": "Justine Bateman is getting older, and she doesnt care what people think.\r\nBateman, 57, has been a star since she was a teenager, and people watched her grow up on-screen.\r\nBut the Family Ties star di… [+3141 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "YouTube"
            },
            "author": null,
            "title": "FULL MATCH - The Rock vs. John Cena - WWE Title Match: WrestleMania 29 - WWE",
            "description": "It's all about redemption for John Cena as he challenges The Rock for the WWE Championship in the main event of WrestleMania 29: Courtesy of Peacock and WWE ...",
            "url": "https://www.youtube.com/watch?v=qTHm5GoGW7c",
            "urlToImage": "https://i.ytimg.com/vi/qTHm5GoGW7c/maxresdefault.jpg",
            "publishedAt": "2023-03-27T13:00:39Z",
            "content": null
        },
        {
            "source": {
                "id": null,
                "name": "New York Post"
            },
            "author": "Snejana Farberov",
            "title": "Jonathan Majors Army recruiting ads pulled after domestic assault arrest - New York Post ",
            "description": "Jonathan Majors appeared as the narrator in Army recruiting ads that premiered at the start of the NCAA’s March Madness tournament.",
            "url": "https://nypost.com/2023/03/27/army-pulls-recruiting-ads-with-jonathan-majors-after-arrest/",
            "urlToImage": "https://nypost.com/wp-content/uploads/sites/2/2023/03/NYPICHPDPICT000008841536.jpg?quality=75&strip=all&w=1024",
            "publishedAt": "2023-03-27T12:55:00Z",
            "content": "The Army pulled the plug on a new ad campaign featuring Jonathan Majors after the Creed III actor was arrested for domestic assault after an alleged attack on his girlfriend.\r\nThe “Lovecraft Country”… [+3556 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Eonline.com"
            },
            "author": "Kisha Forde",
            "title": "John Legend Hilariously Reacts to Harry Styles and Emily Ratajkowski Making Out to His Song - E! NEWS",
            "description": "John Legend had the perfect reaction to learning Harry Styles and Emily Ratajkowski were spotted kissing as one of his songs played in the background. See the singer's dope response.",
            "url": "https://www.eonline.com/news/1369390/john-legend-hilariously-reacts-to-harry-styles-and-emily-ratajkowski-making-out-to-his-song",
            "urlToImage": "https://akns-images.eonline.com/eol_images/Entire_Site/2023227/rs_1200x1200-230327044742-John_Legend_Harry_Styles_and_Emily_Ratajkowski.jpg?fit=around%7C1080:1080&output-quality=90&crop=1080:1080;center,top",
            "publishedAt": "2023-03-27T12:08:00Z",
            "content": "John Legend's mood is on ecstatic.\r\nIn case you missed it, Harry Styles and Emily Ratajkowski were spotted kissing in Tokyo over the weekendand during their make out session, John's single, \"Dope\" wa… [+658 chars]"
        },
        {
            "source": {
                "id": "ign",
                "name": "IGN"
            },
            "author": "IGN",
            "title": "PETA Tells Amazon to Stop Filming With Animals After Horse Dies on Rings of Power Set - IGN",
            "description": null,
            "url": "https://www.ign.com/articles/peta-tells-amazon-to-stop-filming-with-animals-after-horse-dies-on-rings-of-power-set",
            "urlToImage": null,
            "publishedAt": "2023-03-27T12:05:07Z",
            "content": null
        },
        {
            "source": {
                "id": null,
                "name": "Page Six"
            },
            "author": "Francesca Bacardi",
            "title": "Jen Shah's prison sentence reduced by 1 year - Page Six",
            "description": "Shah, 49, pleaded guilty in July 2022 to defrauding thousands of people out of money, particularly the elderly, in a telemarketing scheme.",
            "url": "https://pagesix.com/2023/03/27/jen-shahs-prison-sentence-reduced-by-1-year/",
            "urlToImage": "https://pagesix.com/wp-content/uploads/sites/3/2023/03/NYPICHPDPICT000008843146.jpg?quality=75&strip=all&w=1200",
            "publishedAt": "2023-03-27T12:01:00Z",
            "content": "Jen Shah won’t be behind bars for as long as she anticipated.\r\nThe “Real Housewives of Salt Lake City” convict’s sentence has been reduced by one year, according to the Federal Bureau of Prisons’ inm… [+2246 chars]"
        },
        {
            "source": {
                "id": "usa-today",
                "name": "USA Today"
            },
            "author": "Hannah Kirby",
            "title": "Miley Cyrus, Dolly Parton's song 'Rainbowland' banned from Wisconsin first-grade concert - USA TODAY",
            "description": "The Waukesha School District's superintendent said the Miley Cyrus-Dolly Parton song could be \"perceived as controversial.\"",
            "url": "https://www.usatoday.com/story/entertainment/music/2023/03/27/miley-cyrus-dolly-parton-rainbowland-banned-first-grade-school-concert/11548483002/",
            "urlToImage": "https://www.gannett-cdn.com/presto/2022/11/22/USAT/edce3920-3a1d-4bdb-ac03-867713bdd44b-NUP_199748_00086.JPG?crop=2249,1265,x0,y351&width=2249&height=1265&format=pjpg&auto=webp",
            "publishedAt": "2023-03-27T11:55:40Z",
            "content": "After a Waukesha teacher found out that \"Rainbowland\" was planned to be one of the songs her first-grade students would be singing at their spring concert, she played it for them. And then they wante… [+3772 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Entertainment Tonight"
            },
            "author": "Rachel McRady",
            "title": "'American Idol': Single Mom Fire Returns for Second Chance Audition After Heartbreaking Moment With Daughter - Entertainment Tonight",
            "description": "Fire, a stripper and single mom, previously brought her young daughter to her failed first audition on 'American Idol.'",
            "url": "https://www.etonline.com/american-idol-single-mom-fire-returns-for-second-chance-audition-after-heartbreaking-moment-with",
            "urlToImage": "https://www.etonline.com/sites/default/files/styles/max_1280x720/public/images/2023-03/idol.jpg?h=50e45c0b&itok=NplNNTCK",
            "publishedAt": "2023-03-27T11:24:44Z",
            "content": "It was a night of redemption for American Idol hopeful, Fire. After a heartbreaking and uncomfortable audition earlier this month, the 22-year-old single mother, who is looking to get away from her j… [+1359 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "HipHopDX"
            },
            "author": "Andy Bustard",
            "title": "Drake Parties With 50 Cent After Lollapalooza Brasil No-Show - HipHopDX",
            "description": "Drake is in hot water after being spotted partying with 50 Cent just hours after canceling his headlining performance at Lollapalooza Brasil.",
            "url": "https://hiphopdx.com/news/drake-lollapolooza-brasil-50-cent-strip-club",
            "urlToImage": "https://static.hiphopdx.com/2023/03/drake-lollapolooza-brasil-50-cent-strip-club-1200x675.png",
            "publishedAt": "2023-03-27T11:00:59Z",
            "content": "Drake has found himself in hot water after being spotted partying with 50 Cent just hours after canceling his headlining performance at Lollapalooza Brasil.\r\nThe OVO Sound hitmaker was due to close o… [+3058 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "YouTube"
            },
            "author": null,
            "title": "Adam Sandler roasted by Dana Carvey, David Spade and Rob Schneider during Mark Twain Prize tribute - CNN",
            "description": "‘Saturday Night Live’ alums Dana Carvey, David Spade, and Rob Schneider crack jokes and pay tribute to their friend Adam Sandler’s accomplished career as he ...",
            "url": "https://www.youtube.com/watch?v=FL1zixu2phs",
            "urlToImage": "https://i.ytimg.com/vi/FL1zixu2phs/maxresdefault.jpg",
            "publishedAt": "2023-03-27T11:00:16Z",
            "content": null
        },
        {
            "source": {
                "id": null,
                "name": "HuffPost"
            },
            "author": "Ron Dicker",
            "title": "Dick Van Dyke Reveals Alarming Detail Following His Car Crash - HuffPost",
            "description": "The 97-year-old \"Mary Poppins\" star gave an update on his health and what happened.",
            "url": "https://www.huffpost.com/entry/dick-van-dyke-airbag-car-crash_n_64215f0ee4b0dd51111e0a77",
            "urlToImage": "https://img.huffingtonpost.com/asset/64215fee2300003200bc6a3b.jpeg?cache=GdcCuVOl01&ops=1200_630",
            "publishedAt": "2023-03-27T10:36:07Z",
            "content": "Dick Van Dyke revealed he had stitches on his mouth from a car wreck earlier this month and indicated how the injury happened.\r\nThe airbags did not deploy, so I just had a face plant right in the ste… [+862 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "NME"
            },
            "author": "Hollie Geraghty",
            "title": "Grimes says she's changed her and Elon Musk's daughter's name from Exa Dark Sideræl - NME",
            "description": "Grimes has revealed that she's renamed her daughter from Exa Dark Sideræl to a single letter, having also changed their son's name in 2020.",
            "url": "https://www.nme.com/news/music/grimes-says-shes-changed-her-and-elon-musks-daughters-name-from-exa-dark-siderael-3420839",
            "urlToImage": "https://www.nme.com/wp-content/uploads/2023/03/grimes-elon-musk-daughter-name-change.jpg",
            "publishedAt": "2023-03-27T09:20:56Z",
            "content": "Grimes has revealed that she’s renamed her daughter, changing the name from Exa Dark Sideræl to a single letter.\r\nThe Canadian artist real name Claire Boucher shares two children with Twitter CEO and… [+2771 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "YouTube"
            },
            "author": null,
            "title": "Prince Andrew To Write Memoir Following The Success Of Prince Harry's 'Spare' | Good Morning Britain - Good Morning Britain",
            "description": "Reports suggest Prince Andrew wants to write his own tell-all book to attempt to repair his damaged reputation.Richard and Susanna speak with journalist and ...",
            "url": "https://www.youtube.com/watch?v=vWRaFjWG8uY",
            "urlToImage": "https://i.ytimg.com/vi/vWRaFjWG8uY/maxresdefault.jpg",
            "publishedAt": "2023-03-27T09:11:17Z",
            "content": null
        },
        {
            "source": {
                "id": null,
                "name": "The Athletic"
            },
            "author": "Chris Vannini",
            "title": "Charlotte Flair on WrestleMania, Bad Bunny, Ronda Rousey, being a 14-time champ and more - The Athletic",
            "description": "The daughter of one of the most well-known pro wrestlers of all time has compiled quite the resume of her own.",
            "url": "https://theathletic.com/4344570/2023/03/27/charlotte-flair-wrestlemania-interview/",
            "urlToImage": "https://cdn.theathletic.com/app/uploads/2023/03/24133938/SD_02242023_O_29503-1-e1679679665685.jpg",
            "publishedAt": "2023-03-27T09:02:45Z",
            "content": "Charlotte Flair has been here many times. Her seventh WrestleMania match is this weekend at SoFi Stadium in Inglewood, Calif., and she enters WrestleMania 39 as the WWE SmackDown Womens Champion. In … [+9877 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Daily Mail"
            },
            "author": "Rebecca Lawrence",
            "title": "Inside Reese Witherspoon's split from Jim Toth - Daily Mail",
            "description": "The  actress, 47, and the actor, 42, kept their marital woes hidden before sharing their 'difficult decision' to divorce just days before their 12th wedding anniversary.",
            "url": "https://www.dailymail.co.uk/tvshowbiz/article-11906237/Inside-Reese-Witherspoons-split-Jim-Toth.html",
            "urlToImage": "https://i.dailymail.co.uk/1s/2023/03/27/10/69153489-0-image-a-12_1679909314917.jpg",
            "publishedAt": "2023-03-27T08:49:00Z",
            "content": "Reese Witherspoon and Jim Toth shocked fans last week when they announced the end of the marriage. \r\nThe actress, 47, and the actor, 42, had kept their marital woes hidden before sharing their 'diffi… [+6749 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Daily Mail"
            },
            "author": "Marta Jary",
            "title": "Euphoria star Sydney Sweeney suffers a wardrobe malfunction - Daily Mail",
            "description": "Sydney Sweeney has been busy working on her upcoming Australian-made film in Sydney, NSW.",
            "url": "https://www.dailymail.co.uk/tvshowbiz/article-11906183/Euphoria-star-Sydney-Sweeney-suffers-wardrobe-malfunction.html",
            "urlToImage": "https://i.dailymail.co.uk/1s/2023/03/27/11/69156013-0-image-a-133_1679914730993.jpg",
            "publishedAt": "2023-03-27T08:40:39Z",
            "content": "Sydney Sweeney has been busy working on her upcoming Australian-made film in Sydney, NSW.  \r\nThe 25-year-old suffered a minor wardrobe malfunction as she shot scenes at the iconic Sydney Opera House … [+4999 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "The Federalist"
            },
            "author": "Evita Duffy-Alfonso",
            "title": "Justin Bieber Is The Real Villain In The Hailey-Selena Feud - The Federalist",
            "description": "Everyone has failed to recognize the real villain in the Hailey Bieber-Selena Gomez drama (and no, it’s not Hailey).",
            "url": "https://thefederalist.com/2023/03/27/the-real-villain-in-the-hailey-bieber-selena-gomez-feud-is-justin-bieber/",
            "urlToImage": "https://thefederalist.com/wp-content/uploads/2023/03/Untitled-design.jpg",
            "publishedAt": "2023-03-27T08:13:55Z",
            "content": "The three-month-long Hailey Bieber-Selena Gomez public catfight appears to be finally winding down after Selena took to Instagram on Friday, condemning the hateful negativity and death threats that h… [+4702 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "HuffPost"
            },
            "author": "Ben Blanchet",
            "title": "Mississippi News Anchor Off The Air After Dropping Snoop Dogg Quote - HuffPost",
            "description": "WLBT's Barbie Bassett made the remark during a discussion about the rapper's wine business earlier this month.",
            "url": "https://www.huffpost.com/entry/news-anchor-snoop-dogg-quote_n_64210fd6e4b048e0689f24d4",
            "urlToImage": "https://img.huffingtonpost.com/asset/642138d02700001f001bd50d.png?cache=XOhRTCGVuA&ops=1200_630",
            "publishedAt": "2023-03-27T08:10:42Z",
            "content": "A Mississippi news anchors usage of a catchphrase popularized by Snoop Dogg has reportedly left her off the air since earlier this month.\r\nBarbie Bassett, a journalist and meteorologist with Jackson-… [+1498 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "indy100"
            },
            "author": "Harriet Brewis",
            "title": "21 Jump Street director responds to Kanye West's Jonah Hill epiphany - indy100",
            "description": "The director of 21 Jump Street has responded to Kanye West’s claim that he had an epiphany after watching the film.The disgraced rapper posted a statement to Instagram on Saturday saying that Jonah Hill’s performance in the 2012 action-comedy had cured him of…",
            "url": "https://www.indy100.com/celebrities/21-jump-street-kanye-west-2659658405",
            "urlToImage": "https://www.indy100.com/media-library/kanye-wests-anti-semitic-remarks-sparked-surge-in-attacks-on-jewish-people-in.jpg?id=33354571&width=1200&height=600&coordinates=0%2C4%2C0%2C496",
            "publishedAt": "2023-03-27T07:25:44Z",
            "content": "The director of 21 Jump Street has responded to Kanye Wests claim that he had an epiphany after watching the film.\r\nThe disgraced rapper posted a statement to Instagram on Saturday saying that Jonah … [+1939 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Greatandhra.com"
            },
            "author": "IANS",
            "title": "Samantha says 'who will love me like you do' - Greatandhra",
            "description": "Actress Samantha Prabhu, who sizzled the screens with her performance with 'Oo Antava' in 'Pushpa: The Rise', has talked about dating in her recent tweet.",
            "url": "https://www.greatandhra.com/movies/news/samantha-says-who-will-love-me-like-you-do-128196",
            "urlToImage": "https://www.greatandhra.com/newphotos10/Samantha31679901606.jpg",
            "publishedAt": "2023-03-27T07:20:06Z",
            "content": "Actress Samantha Prabhu, who sizzled the screens with her performance with 'Oo Antava' in 'Pushpa: The Rise', has talked about dating in her recent tweet.\r\nA fan on the micro-blogging website shared … [+504 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Yahoo Entertainment"
            },
            "author": "Lyndsey Parker",
            "title": "Who's that girl? '80s new wave legend's daughter tries out for 'American Idol.' - Yahoo Entertainment",
            "description": "As the Eurythmics' Dave Stewart showed up to accompany his daughter Kaya, he claimed that going on 'Idol' was \"more difficult than being inducted into the...",
            "url": "https://www.yahoo.com/entertainment/whos-that-girl-80s-new-wave-legends-daughter-tries-out-for-american-idol-051512235.html",
            "urlToImage": "https://s.yimg.com/ny/api/res/1.2/zOyg5WshYAD7jVlr2T8JIQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://s.yimg.com/os/creatr-uploaded-images/2023-03/20089630-cc5a-11ed-b3ff-af95cd3b3ad9",
            "publishedAt": "2023-03-27T05:15:00Z",
            "content": "Kaya Stewart auditions for 'American Idol' with her famous, Dave tewart of Eurythmics. (Photo: ABC/Eric McCandless)\r\nAmerican Idol has had its share of what people nowadays deridingly call nepo-babie… [+12670 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "INSIDER"
            },
            "author": "Julia Naftulin",
            "title": "Couple opened 11-year marriage to 'brother husband' - Insider",
            "description": "Married couple, Kim and Dustin, brought Vinson into their relationship, which they share with viewers on the TLC series \"Seeking Brother Husband.\"",
            "url": "https://www.insider.com/couple-opened-11-year-marriage-to-brother-husband-2023-3",
            "urlToImage": "https://i.insider.com/641c8de8d67fe70018a3722e?width=1200&format=jpeg",
            "publishedAt": "2023-03-27T03:00:09Z",
            "content": "Kim loves Dustin, her husband, and Vinson, her boyfriend, and that's exactly why she wants to find another partner. \r\nA year ago, Kim and Dustin decided to open their marriage, specifically in search… [+6118 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Deadline"
            },
            "author": "Armando Tinoco",
            "title": "‘Wicked’: Ariana Grande Shares Behind The Scenes Photos Alongside Cynthia Erivo - Deadline",
            "description": "Ariana Grande and Cynthia Erivo are getting ready to make their wickedly debut in the highly-anticipated film adaptation of the Wicked Broadway musical. The pair took to Instagram to share a set of…",
            "url": "https://deadline.com/2023/03/wicked-ariana-grande-behind-the-scenes-photos-cynthia-erivo-1235310489/",
            "urlToImage": "https://deadline.com/wp-content/uploads/2023/03/ariana-grande-cynthia-erivo-wicked-musical.jpg?w=1024",
            "publishedAt": "2023-03-27T02:38:00Z",
            "content": "Ariana Grande and Cynthia Erivo are getting ready to make their wickedly debut in the highly-anticipated film adaptation of the Wicked Broadway musical.\r\nThe pair took to Instagram to share a set of … [+1747 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Vulture"
            },
            "author": "Amy Zimmerman",
            "title": "Lady Gaga Joker 2 Movie Filming Scene Was Full of Fans - Vulture",
            "description": "Lady Gaga upstaging the Trump indictment while filming  Joker: Folie é Deux at the  New York County Supreme Court.",
            "url": "http://www.vulture.com/2023/03/lady-gaga-joker-2-harley-quinn-court-house-scene.html",
            "urlToImage": "https://pyxis.nymag.com/v1/imgs/a44/569/5a5ebdda3844234667f55e1b3d457995f4-gaga-joker-on-set.1x.rsocial.w1200.jpg",
            "publishedAt": "2023-03-27T02:20:25Z",
            "content": "Ruben, a food delivery worker, was taking a break on Sunday March 26 when a crowd outside the New York County Supreme Court caught his eye. Protestors lined the steps of the courthouse, jeering and w… [+3910 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Vulture"
            },
            "author": "Emily St. James",
            "title": "Succession Season 4 Premiere Power Rankings: 'The Munsters' - Vulture",
            "description": "‘The Munsters,’ the fourth and final-season premiere of ‘Succession,’ is full of maneuvering among the Roy family, Nan Pierce’s many headaches, and the abstract concept of time. Here’s who came out on top this week, and who’s poised to take over.",
            "url": "http://www.vulture.com/article/succession-season-4-premiere-power-rankings-the-munsters.html",
            "urlToImage": "https://pyxis.nymag.com/v1/imgs/232/ee3/6de7b509b98c3f7ea0d5ad95a92853fc55-succession.1x.rsocial.w1200.jpg",
            "publishedAt": "2023-03-27T02:06:53Z",
            "content": "Its fitting that the first power rankings of Successions final season involve an actual power struggle. The three youngest Roy children face off with their father in a high-stakes competition to purc… [+11085 chars]"
        }
    ]

    // const updateNews = async () => {
    //     props.setProgress(10);

    //     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

    //     setLoading(true);
    //     let response = await axios.get(url);
    //     props.setProgress(30);
    //     let data = await response.data;

    //     props.setProgress(70);

    //     setArticles(data.articles);
    //     setTotalResults(data.totalResults);
    //     setLoading(false);
    //     console.log(articles);

    //     props.setProgress(100);
    // }

    // useEffect(() => {
    //     document.title = `${capitalize()} - Khabar Khazana`
    //     updateNews();
    //     // eslint-disable-next-line
    // }, []);

    // const fetchMoreData = async () => {

    //     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;

    //     setPage(page + 1);

    //     let response = await axios.get(url);
    //     let data = await response.data;
    //     setArticles(articles.concat(data.articles));
    //     setTotalResults(data.totalResults);
    // }

    return (
        <>
            <h1 className='text-center' style={{
                marginTop: "85px",
                marginBottom: "35px",
                color: props.mode === "light" ? "black" : "white",
                fontSize: "32px"
            }}>{capitalize()} Headlines</h1>

            {/* {loading && <Spinner />} */}

            {/* <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            > */}
                <div className="container">
                    <div className="row">
                        {myArticles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : "Read More to view"} description={element.description ? element.description.slice(0, 88) : "Read More to view"} imgUrl={element.urlToImage ? element.urlToImage : "https://sportshub.cbsistatic.com/i/r/2022/09/23/74b35def-9b2a-413a-832a-94afe0b59286/thumbnail/1200x675/380dc025d646683467a61559f83e2000/chubb-pitt.png"} newsUrl={element.url} author={element.author ? element.author : "unknown"} date={element.publishedAt ? element.publishedAt : "unknown"} source={element.source.name} mode={props.mode} />
                            </div>
                        })}
                    </div>
                </div>
            {/* </InfiniteScroll> */}
        </>
    )
}


News.defaultProps = {
    country: 'in',
    pageSize: 9,
    category: "general"
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}