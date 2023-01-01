import React from 'react';
import { observer } from 'mobx-react';
import ReactMarkdown from 'react-markdown';

import { ISidebox } from '../../types/types';
import './SideboxCard.scss';

interface IProps {
  sidebox: ISidebox;
}

const SideboxCard: React.FC<IProps> = ({ sidebox }) => (
  <div className="flex-col flex-col--4 sidebox--container">
    <div className="flex-container flex-container--mobile-no-padding sidebox">
      <div className="flex-col--12">
        <h3>{sidebox.title}</h3>
      </div>
      <div className="flex-col--12">
        <ReactMarkdown source={sidebox.content} />
      </div>
    </div>
  </div>
);

export default observer(SideboxCard);
