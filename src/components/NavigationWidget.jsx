import React from 'react';
import { connect } from '../store/Connect';
import CrosshairToggle from './CrosshairToggle.jsx';
import '../../sass/components/navigation-widget.scss';

import { ZoominIcon, ZoomoutIcon, ScaleIcon } from './Icons.jsx';

const NavigationWidget = ({
    context,
    zoomIn,
    zoomOut,
    onScale,
    enableScale,
    onMouseEnter,
    onMouseLeave,
    isScaledOneOne,
    onCrosshairChange,
}) => {
    if (!context) return '';

    return (
        <div
            className="sc-navigation-widget"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div
                className={`sc-navigation-widget__item sc-navigation-widget__item--scale ${!enableScale ? 'sc-navigation-widget__item--hidden' : ''} ${isScaledOneOne ? 'sc-navigation-widget__item--disabled' : ''}`}
                onClick={onScale}
            >
                <ScaleIcon />
            </div>
            <div
                className="sc-navigation-widget__item sc-navigation-widget__item--zoom"
            >
                <ZoominIcon onClick={zoomIn} />
                <CrosshairToggle onChange={onCrosshairChange} />
                <ZoomoutIcon onClick={zoomOut} />
            </div>
        </div>
    );
};

export default connect(({ chart, chartSize, navigationWidget }) => ({
    context: chart.context,
    isScaledOneOne: chart.isScaledOneOne,
    zoomIn: chartSize.zoomIn,
    zoomOut: chartSize.zoomOut,
    onScale: navigationWidget.onScale,
    enableScale: navigationWidget.enableScale,
    onMouseEnter: navigationWidget.onMouseEnter,
    onMouseLeave: navigationWidget.onMouseLeave,
}))(NavigationWidget);
