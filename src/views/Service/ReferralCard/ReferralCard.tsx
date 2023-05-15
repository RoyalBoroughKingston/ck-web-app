import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../../../components/Button';
import ButtonLink from '../../../components/Button/ButtonLink';
import { withRouter, RouteComponentProps } from 'react-router';
import { observer } from 'mobx-react';

interface IProps extends RouteComponentProps {
  id: string;
  referral_method: 'internal' | 'external' | 'none';
  referral_url: string | null;
}

const ReferralCard: React.FunctionComponent<IProps> = ({
  history,
  id,
  referral_method,
  referral_url,
}) => (
  <div className="flex-container flex-container--align-center flex-container--justify flex-container--mobile-no-padding service__referral">
    <div className="flex-col flex-col--tablet--6 flex-col--mobile--12 flex-col--mobile-small--12">
      {referral_method === 'external' && referral_url ? (
        <ButtonLink text="Make a connection" icon="arrow-right" href={referral_url} />
      ) : (
        <Button
          text="Make a connection"
          icon="arrow-right"
          onClick={() => history.push(`/referral?service=${id}`)}
        />
      )}
    </div>
    <div className="flex-col flex-col--tablet--12">
      <div className="flex-container flex-container--justify flex-container--mobile-no-padding service__refer-disclaimer">
        <div className="flex-col--1">
          <FontAwesomeIcon icon="info-circle" />
        </div>
        <div className="flex-col--11">
          <p>
            It can take up to <strong>2 weeks</strong> to receive a reply
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default withRouter(observer(ReferralCard));
