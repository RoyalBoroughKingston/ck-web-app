import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import queryString from 'query-string';
import { withRouter, RouteComponentProps } from 'react-router';
import get from 'lodash/get';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ReferralStore from '../../stores/referralStore';

import './Referral.scss';
import Button from '../../components/Button';
import { apiBase } from '../../config/api';
import StepOne from './Steps/StepOne';
import StepTwo from './Steps/StepTwo';

interface IProps extends RouteComponentProps {
  referralStore?: ReferralStore;
}

class Referral extends Component<IProps> {
  componentDidMount() {
    const { location, referralStore } = this.props;

    if (!referralStore) {
      return;
    }

    const params = queryString.parse(location.search);
    const serviceId = get(params, 'service', '');

    if (params) {
      referralStore.getServiceInfo(serviceId as string);
    }
  }

  displayStep = () => {
    const { referralStore } = this.props;

    switch (get(referralStore, 'step')) {
      case 1:
        return <StepOne name={get(referralStore, 'service.name')} />;
      case 2:
        return <StepTwo name={get(referralStore, 'service.name')} />;
      default:
        break;
    }
  };

  render() {
    const { referralStore } = this.props;

    if (!referralStore || !referralStore.service) {
      return null;
    }

    return (
      <div className="flex-container flex-container--mobile-no-padding referral">
        <div className="flex-col flex-col--12 referral--back">
          <Link to={`/service/${referralStore.service.slug}`}>
            <p className="body--s">
              <FontAwesomeIcon icon="angle-left" />
              Back to service
            </p>
          </Link>
        </div>

        <div className="mobile-show tablet-show flex-col--mobile--12">
          <div className="flex-container">
            <div className="flex-col flex-col--mobile--12 referral--mobile-connect">
              <p className="body--s">Connect to</p>
              <p className="body--s referral--mobile-connect--name">{referralStore.service.name}</p>
            </div>
          </div>
        </div>

        <div className="flex-container flex-container--mobile-no-padding referral--container">
          {this.displayStep()}
          <div className="mobile-hide tablet-hide flex-col--5 flex-col--tablet-large--6">
            <div className="flex-container referral--right-column">
              <div className="flex-col flex-col--12">
                <div className="flex-container flex-container--align-center referral--connect">
                  <div className="flex-col flex-col--3">
                    <div className="referral--connect--logo">
                      <img
                        src={`${apiBase}/organisations/${referralStore.service.organisation_id}/logo.png?v=${referralStore.service.last_modified_at}`}
                        alt={`${referralStore.service.name} logo`}
                      />
                    </div>
                  </div>
                  <div className="flex-col flex-col--9">
                    <p>Your making a connection to:</p>
                    <h3>{referralStore.service.name}</h3>
                  </div>
                </div>
              </div>

              {referralStore.step === 1 && (
                <div className="flex-col flex-col--12 flex-col--mobile--12 mobile-hide tablet-hide">
                  <div className="flex-container flex-container--align-center referral--intro--no-padding">
                    <div className="flex-col flex-col--12  flex-col--mobile--12 referral--form-time">
                      <div className="flex-container flex-container--align-center referral--intro--no-padding">
                        <div
                          className="flex-col flex-col--2 flex-col--mobile--2"
                          style={{ textAlign: 'center' }}
                        >
                          <FontAwesomeIcon icon="clock" />
                        </div>
                        <div className="flex-col flex-col--10 flex-col--mobile--10">
                          <p>
                            This form should take no longer than <strong>5 minutes</strong> to
                            complete.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {referralStore.step === 1 && (
          <div className="flex-col flex-col--mobile--12 mobile-show tablet-show">
            <div className="flex-container flex-container--align-center">
              <div className="flex-col flex-col--mobile--12 referral--form-time">
                <div className="flex-container flex-container--align-center flex-container--mobile-no-padding">
                  <div className="flex-col flex-col--mobile--2">
                    <FontAwesomeIcon icon="clock" />
                  </div>
                  <div className="flex-col flex-col--mobile--10">
                    <p>
                      This form should take no longer than <strong>5 minutes</strong> to complete.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex-col flex-col--12 flex-col--mobile--12">
          <div className="flex-container referral--next-step referral--intro--no-padding">
            <div className="flex-col flex-col--12 flex-col--mobile--12">
              <Button
                text="Continue"
                icon="chevron-right"
                onClick={() => referralStore.nextStep()}
                disabled={referralStore.step === 2 && !referralStore.whoFor}
              />
            </div>
            <div className="flex-col flex-col--12 referral--step">
              <span className="body--s">
                <strong>First step -</strong> Who would you like to be connected?
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default inject('referralStore')(withRouter(observer(Referral)));