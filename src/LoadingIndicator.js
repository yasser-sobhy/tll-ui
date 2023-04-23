import React from 'react';

export const BlockLoadingIndicator = () => {
    return (
        <>
            <div className="h-full flex justify-center">
                <div className="p-4 justify-self-center self-center	">
                    <div className="loader">
                        <div className="ball-beat">
                            <div className="" ></div>
                            <div className=""></div>
                            <div className=""></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const LoadingIndicator = () => {
    return (
        <div className="h-full flex justify-center">
            <div className="p-4 justify-self-center self-center	">
                <div className="loader">
                    <div className="line-scale-pulse-out">
                        <div className=""></div>
                        <div className=""></div>
                        <div className=""></div>
                        <div className=""></div>
                        <div className=""></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoadingIndicator;