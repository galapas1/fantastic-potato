import React from 'react';
import ReactTooltip from 'react-tooltip';
import { SmallHelpScreenComponent } from 'Components';

const HelpScreenTooltip = ({id, helpScreenType, helpScreenTitle, showPopup, popup, firstParagraph, secondParagraph, isShow }) => {
  if (isShow) {
    return (
      <div>
        <ReactTooltip id={id} effect="solid" place="right" class='extraClass'  type='light' delayHide={200}>
          <SmallHelpScreenComponent  title={helpScreenTitle} firstParagraph={firstParagraph}  secondParagraph={secondParagraph} clickMoreInformation={() => showPopup(popup, {helpScreenType: helpScreenType, helpScreenTitle: helpScreenTitle}) } />
        </ReactTooltip>
      </div>
    )
  } else {
    return null;
  }
}

export default HelpScreenTooltip;