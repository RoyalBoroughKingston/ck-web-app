import React from 'react';
import { apiBase } from '../../config/api';

import './PersonasCard.scss';
import { IPersona } from '../../types/types';
import { inject, observer } from 'mobx-react';
import WindowSizeStore from '../../stores/windowSizeStore';

interface IProps {
  persona: IPersona;
  action: () => void;
  windowSizeStore?: WindowSizeStore;
}

const PersonasCard: React.FunctionComponent<IProps> = ({ persona, action, windowSizeStore }) => (
  <article className="card" onClick={action} role="navigation" tabIndex={0}>
    <img
      src={`${apiBase}/collections/personas/${persona.id}/image.png?max_dimension=300`}
      alt={`Services relating to ${persona.name}`}
    />
    <div className=" card__description">
      <h3 className="card__header">{persona.name}</h3>
      <p className="mobile-hide">{persona.intro}</p>

      <span className="card__link">Explore &gt;</span>
    </div>
  </article>
);

export default inject('windowSizeStore')(observer(PersonasCard));
