import React from 'react';
import { observer } from 'mobx-react';
import ReactMarkdown from 'react-markdown';

import { ISidebox } from '../../types/types';
import './SideboxCard.scss';

interface IProps {
  sidebox: ISidebox;
}

const SideboxCard: React.FC<IProps> = ({ sidebox }) => (
  <div className="sidebox--container">
    <h3>{sidebox.title}</h3>

    <ReactMarkdown children={sidebox.content} />
  </div>
);

export default observer(SideboxCard);
