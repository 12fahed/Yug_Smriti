"use client";
import { useState, useEffect, useRef } from "react";
import Search from "../../../components/Search";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import('../../../components/Globe'), { ssr: false });

interface WikiPage {
    title: string;
    extract: string;
}

interface WikiData {
    query: {
        pages: {
            [key: string]: {
                title: string;
                extract: string;
            };
        };
    };
}

interface YouTubeItem {
    id: {
        videoId: string;
    };
    snippet: {
        title: string;
        thumbnails: {
            medium: {
                url: string;
            };
        };
    };
}

interface ContentSection {
    type: 'text' | 'image' | 'video';
    content: string;
    mediaUrl?: string;
}

export default function User1() {
    const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
    const [eventDetails, setEventDetails] = useState<any>(null);
    const [youtubeVideos, setYoutubeVideos] = useState<YouTubeItem[]>([]);
    const [eventImages, setEventImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isNarrating, setIsNarrating] = useState(false);
    const [contentSections, setContentSections] = useState<ContentSection[]>([]);
    const [activeSection, setActiveSection] = useState(0);
    const [showGlobe, setShowGlobe] = useState(false);
    const [showContent, setShowContent] = useState(false);
    
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const isNarrationComplete = useRef<boolean>(false);
    const contentContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        audioRef.current = new Audio();
        audioRef.current.onended = () => {
            if (!isNarrationComplete.current && activeSection < contentSections.length - 1) {
                setActiveSection(prev => prev + 1);
            } else {
                setIsNarrating(false);
            }
        };
    }, []);

    const handleEventSelection = (event: string) => {
        if (isNarrating) {
            stopNarration();
        }
        setSelectedEvent(event);
        setEventDetails(null);
        setYoutubeVideos([]);
        setEventImages([]);
        setError(null);
        setContentSections([]);
        setActiveSection(0);
        setShowContent(false);
        setShowGlobe(true);
    };

    const handleGlobeAnimationComplete = () => {
        setShowGlobe(false);
        setTimeout(() => {
            setShowContent(true);
        }, 100);
    };

    const splitContentIntoSections = (text: string, images: string[], videos: YouTubeItem[]) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const paragraphs = Array.from(doc.body.getElementsByTagName('p'));
        
        let sections: ContentSection[] = [];
        
        paragraphs.forEach((p, index) => {
            if (p.textContent && p.textContent.trim() !== '') {
                sections.push({
                    type: 'text',
                    content: p.textContent
                });
                
                if (index % 2 === 0 && images[Math.floor(index/2)]) {
                    sections.push({
                        type: 'image',
                        content: `Related historical image ${Math.floor(index/2) + 1}`,
                        mediaUrl: images[Math.floor(index/2)]
                    });
                }
                
                if (index % 3 === 0 && videos[Math.floor(index/3)]) {
                    sections.push({
                        type: 'video',
                        content: videos[Math.floor(index/3)].snippet.title,
                        mediaUrl: videos[Math.floor(index/3)].id.videoId
                    });
                }
            }
        });
        
        return sections;
    };

    const playVoiceRSS = async (text: string) => {
        const apiKey = process.env.NEXT_PUBLIC_VOICE_RSS_API_KEY;
        const url = `https://api.voicerss.org/?key=${apiKey}&hl=en-us&f=48khz_16bit_stereo&v=Mary&src=${encodeURIComponent(text)}`;
        
        if (audioRef.current) {
            audioRef.current.src = url;
            await audioRef.current.play();
        }
    };

    const startNarration = () => {
        setIsNarrating(true);
        isNarrationComplete.current = false;
        narrateNextSection();
    };

    const narrateNextSection = () => {
        const currentSection = contentSections[activeSection];
        
        if (audioRef.current) {
            audioRef.current.pause();
        }
        
        if (currentSection.type === 'text') {
            playVoiceRSS(currentSection.content);
        } else {
            setTimeout(() => {
                if (!isNarrationComplete.current && activeSection < contentSections.length - 1) {
                    setActiveSection(prev => prev + 1);
                } else {
                    setIsNarrating(false);
                }
            }, 2000);
        }
    };

    useEffect(() => {
        if (isNarrating) {
            narrateNextSection();
        }
    }, [activeSection]);

    const stopNarration = () => {
        if (audioRef.current) {
            isNarrationComplete.current = true;
            audioRef.current.pause();
            setIsNarrating(false);
        }
    };

    const toggleNarration = () => {
        if (isNarrating) {
            stopNarration();
        } else {
            startNarration();
        }
    };

    const handlePrevSection = () => {
        if (!isNarrating && activeSection > 0) {
            setActiveSection(prev => prev - 1);
        }
    };

    const handleNextSection = () => {
        if (!isNarrating && activeSection < contentSections.length - 1) {
            setActiveSection(prev => prev + 1);
        }
    };

    useEffect(() => {
        if (!selectedEvent) return;

        const fetchEventDetails = async () => {
            setIsLoading(true);
            try {
                const wikiResponse = await fetch(`/api/wiki/${encodeURIComponent(selectedEvent)}`);
                if (!wikiResponse.ok) {
                    throw new Error(`Failed to fetch Wikipedia data: ${wikiResponse.status}`);
                }
                
                const wikiData: WikiData = await wikiResponse.json();
                const page = Object.values(wikiData.query.pages)[0];
                
                if (page && page.extract) {
                    setEventDetails(page.extract);
                } else {
                    setError("No Wikipedia information available for this event.");
                }

                const youtubeResponse = await fetch(
                    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
                        selectedEvent + " historical event"
                    )}&type=video&maxResults=4&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
                );
                const youtubeData = await youtubeResponse.json();
                if (youtubeData.items?.length > 0) {
                    setYoutubeVideos(youtubeData.items);
                }

                const imageResponse = await fetch(
                    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
                        selectedEvent + " historical"
                    )}&per_page=8&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
                );
                const imageData = await imageResponse.json();
                if (imageData.results?.length > 0) {
                    setEventImages(imageData.results.map((image: any) => image.urls.regular));
                }

                if (page?.extract) {
                    const sections = splitContentIntoSections(
                        page.extract,
                        imageData.results?.map((img: any) => img.urls.regular) || [],
                        youtubeData.items || []
                    );
                    setContentSections(sections);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("An error occurred while fetching data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchEventDetails();
    }, [selectedEvent]);

    return (
        <div 
            className="min-h-screen relative bg-cover bg-repeat" 
            style={{ 
                backgroundImage: 'url(/theme-bg.jpg)', 
                backgroundColor: '#F5E6D3' 
            }}
        >
            <div className="container mx-auto py-12 px-4">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-bold mb-4" style={{ color: '#2C1810' }}>
                        Where's Your Journey to Today?
                    </h1>
                    <p className="text-lg" style={{ color: '#8B4513' }}>
                        Journey through time and explore historical events
                    </p>
                </motion.div>
                
                <Card 
                    className="mb-8" 
                    style={{ 
                        backgroundColor: 'transparent', 
                        boxShadow: 'none' 
                    }}
                >
                    <CardContent className="pt-6">
                        <Search 
                            onSelectEvent={handleEventSelection} 
                            setShowGlobe={setShowGlobe}
                        />
                    </CardContent>
                </Card>

                <div className="relative">
                    {contentSections.length > 0 && !isLoading && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: showContent ? 1 : 0 }}
                            className="mt-8"
                        >
                            <Card className="shadow-lg" style={{ backgroundColor: '#FFF8DC' }}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                                    <CardTitle className="text-3xl font-bold" style={{ color: '#2C1810' }}>
                                        {selectedEvent?.replace(/_/g, " ")}
                                    </CardTitle>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            onClick={handlePrevSection}
                                            disabled={isNarrating || activeSection === 0}
                                            variant="outline"
                                            size="icon"
                                            style={{
                                                backgroundColor: '#2C1810',
                                                color: '#FFF8DC'
                                            }}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            onClick={handleNextSection}
                                            disabled={isNarrating || activeSection === contentSections.length - 1}
                                            variant="outline"
                                            size="icon"
                                            style={{
                                                backgroundColor: '#2C1810',
                                                color: '#FFF8DC'
                                            }}
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            onClick={toggleNarration}
                                            variant={isNarrating ? "destructive" : "default"}
                                            size="icon"
                                            style={{
                                                backgroundColor: isNarrating ? '#8B4513' : '#2C1810',
                                                color: '#FFF8DC'
                                            }}
                                        >
                                            {isNarrating ? (
                                                <Pause className="h-4 w-4" />
                                            ) : (
                                                <Play className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    <div 
                                        ref={contentContainerRef}
                                        className="relative h-[70vh] overflow-hidden rounded-lg"
                                        style={{ backgroundColor: '#F5E6D3' }}
                                    >
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={activeSection}
                                                initial={{ x: '100%' }}
                                                animate={{ x: 0 }}
                                                exit={{ x: '-100%' }}
                                                transition={{ type: 'tween', duration: 0.5 }}
                                                className="absolute top-0 left-0 w-full h-full p-6"
                                            >
                                                {contentSections[activeSection]?.type === 'text' && (
                                                    <div className="prose max-w-none">
                                                        <p className="text-lg leading-relaxed" style={{ color: '#2C1810' }}>
                                                            {contentSections[activeSection].content}
                                                        </p>
                                                    </div>
                                                )}

                                                {contentSections[activeSection]?.type === 'image' && 
                                                 contentSections[activeSection].mediaUrl && (
                                                    <div className="flex items-center justify-center h-full">
                                                        <img
                                                            src={contentSections[activeSection].mediaUrl}
                                                            alt={contentSections[activeSection].content}
                                                            className="max-h-[50vh] w-auto object-contain rounded-lg shadow-xl"
                                                        />
                                                    </div>
                                                )}

                                                {contentSections[activeSection]?.type === 'video' && 
                                                 contentSections[activeSection].mediaUrl && (
                                                    <div className="flex items-center justify-center h-full">
                                                        <iframe
                                                            width="560"
                                                            height="315"
                                                            src={`https://www.youtube.com/embed/${contentSections[activeSection].mediaUrl}`}
                                                            title={contentSections[activeSection].content}
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                            className="rounded-lg shadow-xl"
                                                        />
                                                    </div>
                                                )}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {showGlobe && (
                        <div className="absolute inset-0 z-50" style={{ height: '70vh' }}>
                            <Globe onAnimationComplete={handleGlobeAnimationComplete} />
                            </div>
                    )}

                    {isLoading && !showGlobe && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center mt-8"
                        >
                            <Card className="p-8" style={{ backgroundColor: '#FFF8DC' }}>
                                <CardContent className="flex flex-col items-center gap-4">
                                    <Loader2 className="h-8 w-8 animate-spin" style={{ color: '#8B4513' }} />
                                    <p className="text-lg" style={{ color: '#2C1810' }}>
                                        Preparing your historical journey...
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {error && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-8"
                        >
                            <Card className="border-red-500" style={{ backgroundColor: '#FFF8DC' }}>
                                <CardContent className="p-6 text-center text-red-600">
                                    {error}
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}