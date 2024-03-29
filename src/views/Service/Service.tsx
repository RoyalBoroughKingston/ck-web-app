import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import get from 'lodash/get';
import map from 'lodash/map';
import find from 'lodash/find';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';
import cx from 'classnames';
import uniqueId from 'lodash/uniqueId';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { apiBase } from '../../config/api';

import './Service.scss';

import { removeQuotesRegex, capitalise } from '../../utils/utils';
import { IServiceLocation, IService } from '../../types/types';
import ServiceStore from '../../stores/serviceStore';
import UIStore from '../../stores/uiStore';

import AgeGroup from '../../assets/images/icons/who-is-this-for/age-group.svg';
import Disability from '../../assets/images/icons/who-is-this-for/disability.svg';
import Employment from '../../assets/images/icons/who-is-this-for/employment.svg';
import Gender from '../../assets/images/icons/who-is-this-for/gender.svg';
import Housing from '../../assets/images/icons/who-is-this-for/housing.svg';
import Income from '../../assets/images/icons/who-is-this-for/income.svg';
import Language from '../../assets/images/icons/who-is-this-for/language.svg';
import Other from '../../assets/images/icons/who-is-this-for/other.svg';

import Button from '../../components/Button';
import CriteriaCard from './CriteriaCard';
import Accordian from '../../components/Accordian';
import LocationCard from './LocationCard';
import CostCard from './CostCard';
import VideoCard from './VideoCard';
import ContactCard from './ContactCard';
import OrganisationCard from './OrganisationCard';
import ButtonCard from './ButtonCard';
import ShareCard from './ShareCard';
import ReferralCard from './ReferralCard';
import GalleryCard from './GalleryCard';
import { UsefulInfoCardAccordian, UsefulInfoCard } from './UsefulInfoCard';
import RelatedServices from './RelatedServices';
import Breadcrumb from '../../components/Breadcrumb';
import Loading from '../../components/Loading';
import ServiceDisabled from './ServiceDisabled';

interface RouteParams {
  service: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  serviceStore: ServiceStore;
  uiStore: UIStore;
}

const iconMap = [
  { 'Getting here': 'map-signs' },
  { 'Signing up': 'marker' },
  { 'Meeting up': 'handshake' },
  { 'What to wear': 'tshirt' },
  { 'What to bring': 'shopping-bag' },
  { 'How to get here': 'map-signs' },
  { Parking: 'car' },
  { 'Keeping updated': 'calander-alt' },
  { 'Additional information': 'info-circle' },
];

const getImg = (service: IService) => {
  if (service.has_logo) {
    return `${apiBase}/services/${service.id}/logo.png?`;
  } else {
    return `${apiBase}/organisations/${get(service, 'organisation.id')}/logo.png?v=${get(
      service,
      'organisation.id'
    )}`;
  }
};

class Service extends Component<IProps> {
  componentDidMount() {
    const { serviceStore, match } = this.props;

    serviceStore.fetchService(match.params.service);
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      const { serviceStore, match } = this.props;

      serviceStore.fetchService(match.params.service);
    }
  }

  formatTestimonial = (testimonial: string) => {
    return `" ${testimonial.replace(removeQuotesRegex, '')} "`;
  };

  render() {
    const { serviceStore, uiStore } = this.props;
    const { service, locations, relatedServices } = serviceStore;
    if (!service) {
      return null;
    }

    // service is disabled
    if (service.status === 'inactive') {
      return <ServiceDisabled />;
    }

    return (
      <main>
        <Breadcrumb
          crumbs={[
            { text: 'Home', url: '/' },
            { text: 'Search', url: '/' },
            { text: service.name, url: '' },
          ]}
        />
        <div className={`service__header service__header--${get(service, 'type')}`}>
          <div className="flex-container flex-container--mobile-no-padding">
            <div className="flex-col flex-col--mobile--9">
              <h1>{get(service, 'name')}</h1>
              <p className="service__header__last-updated">
                Page last updated <span>{moment(service!.updated_at).format('Do MMMM YYYY')}</span>
                <Button
                  text="Give feedback"
                  icon="comment"
                  alt={true}
                  size="small"
                  onClick={() => uiStore.toggleFeedbackModal()}
                />
              </p>
            </div>
            <div className="flex-col flex-col--mobile--3">
              <div className="service__header__logo">
                <img src={getImg(service)} alt={`${service.name} logo`} />
              </div>
            </div>
          </div>
        </div>
        {serviceStore.loading ? (
          <Loading />
        ) : (
          <section className="flex-container flex-container--justify service__info">
            <section className="flex-col flex-col--8 flex-col--mobile--12 flex-col--tablet--12 service__left-column">
              <div className="flex-container flex-container--align-center flex-container--mobile-no-padding service__section service__section--no-padding">
                {serviceStore.hasCriteria && (
                  <div className="flex-col flex-col--12 flex-col--mobile--12 service__criteria">
                    <h2 className="service__heading">Who is it for?</h2>
                  </div>
                )}
                <div
                  className="flex-container flex-container--align-center flex-container--mobile-no-padding service__section service__section--no-padding"
                  style={{ alignItems: 'stretch' }}
                >
                  {get(service, 'criteria.age_group') && (
                    <CriteriaCard
                      svg={AgeGroup}
                      title="Age Group"
                      info={get(service, 'criteria.age_group')}
                    />
                  )}

                  {get(service, 'criteria.disability') && (
                    <CriteriaCard
                      svg={Disability}
                      title="Disability"
                      info={get(service, 'criteria.disability')}
                    />
                  )}

                  {get(service, 'criteria.employment') && (
                    <CriteriaCard
                      svg={Employment}
                      title="Employment Status"
                      info={get(service, 'criteria.employment')}
                    />
                  )}

                  {get(service, 'criteria.gender') && (
                    <CriteriaCard
                      svg={Gender}
                      title="Gender"
                      info={get(service, 'criteria.gender')}
                    />
                  )}

                  {get(service, 'criteria.housing') && (
                    <CriteriaCard
                      svg={Housing}
                      title="Housing"
                      info={get(service, 'criteria.housing')}
                    />
                  )}

                  {get(service, 'criteria.income') && (
                    <CriteriaCard
                      svg={Income}
                      title="Income"
                      info={get(service, 'criteria.income')}
                    />
                  )}

                  {get(service, 'criteria.language') && (
                    <CriteriaCard
                      svg={Language}
                      title="Language"
                      info={get(service, 'criteria.language')}
                    />
                  )}

                  {get(service, 'criteria.other') && (
                    <CriteriaCard svg={Other} title="Other" info={get(service, 'criteria.other')} />
                  )}

                  <div className="flex-col flex-col--mobile--12 mobile-show tablet-show criteria_card service__info__cost">
                    <CostCard service={service} />
                  </div>
                </div>

                <div className="flex-container flex-container--align-center service__media service__section--no-padding">
                  <div className="flex-col flex-col--mobile--12">
                    <h2 className="service__heading">{`What is this ${get(service, 'type')}?`}</h2>
                  </div>
                  {!!service.gallery_items.length && (
                    <div className="flex-container flex-container--mobile-no-padding service__gallery">
                      <GalleryCard gallery={service.gallery_items} />
                    </div>
                  )}
                  {service.video_embed && (
                    <div className="flex-container flex-container--mobile-no-padding mobile-show">
                      <VideoCard video={service.video_embed} width="90vw" />
                    </div>
                  )}
                </div>

                <div className="flex-container flex-container--align-center service__section service__section--no-padding service__information">
                  <div className="flex-col flex-col--12 flex-col--mobile--12">
                    <ReactMarkdown
                      children={service.intro}
                      className="service__markdown service__markdown--intro"
                    />
                  </div>
                  <div className="flex-col flex-col--12 flex-col--mobile--12">
                    <h3>What we offer?</h3>
                  </div>

                  {!!service.offerings.length && (
                    <div className="flex-col flex-col--12 flex-col--mobile--12 service__offerings">
                      {map(service.offerings, (offering: any, i) => (
                        <Fragment key={offering.offering}>
                          <span>{capitalise(offering.offering)}</span>
                          {i < service.offerings.length - 1 ? (
                            <FontAwesomeIcon
                              icon="circle"
                              style={{ fontSize: 8, verticalAlign: 'middle', margin: '0 10px' }}
                            />
                          ) : null}
                        </Fragment>
                      ))}
                    </div>
                  )}

                  <div className="flex-col flex-col--mobile--12 service__section">
                    <ReactMarkdown
                      children={service.description}
                      className={cx('service__markdown service__markdown--description', {
                        'service__markdown--description--tight': !service.offerings.length,
                      })}
                    />
                  </div>
                </div>

                {service.testimonial && (
                  <div className="mobile-hide flex-container service__section service__section--no-padding">
                    <div className="flex-col flex-col--12 service__testimonial--header">
                      <h2 className="service__heading">What people say</h2>
                    </div>

                    <div className="flex-col flex-col--12 service__testimonial">
                      <div className="mobile-hide flex-container flex-container--align-center flex-container--justify service__section--no-padding">
                        <div className="flex-col--1 flex-col--tablet-large--2 flex-col--tablet--2">
                          <FontAwesomeIcon icon="comment" />
                        </div>
                        <div className="flex-col--9 flex-col--tablet--9">
                          <p>{this.formatTestimonial(service.testimonial)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {!!locations.length && (
                  <div className="mobile-hide service__section">
                    <h2 className="service__heading">Where can I access it?</h2>

                    {locations.map((location: IServiceLocation) => (
                      <LocationCard
                        location={location}
                        key={location.id}
                        className="service__accordian-inner"
                        desktop={true}
                      />
                    ))}
                  </div>
                )}

                {!!service.useful_infos.length && (
                  <div className="mobile-hide">
                    <h2 className="service__heading">Good to know</h2>
                    {service.useful_infos.map((info: { title: string; description: string }) => {
                      const iconObj = find(iconMap, info.title);
                      const icon = get(iconObj, `${info.title}`);

                      return <UsefulInfoCard icon={icon} info={info} key={uniqueId()} />;
                    })}
                  </div>
                )}

                {service.referral_method !== 'none' && (
                  <div className="mobile-show">
                    <ReferralCard
                      id={service.id}
                      referral_method={service.referral_method}
                      referral_url={service.referral_url}
                    />
                  </div>
                )}

                <Accordian
                  title={`How can I contact this ${service.type}?`}
                  className="service__accordian mobile-show"
                >
                  <ContactCard service={service} accordian={true} />
                </Accordian>

                {service.testimonial && (
                  <Accordian title="What people say" className="service__accordian mobile-show">
                    <div className="service__accordian-inner">
                      <div className="flex-container flex-container--mobile-no-padding flex-container--justify service__testimonial service__testimonial--mobile">
                        <div className="flex-col--1">
                          <FontAwesomeIcon icon="comment" />
                        </div>
                        <div className="flex-col--12">
                          <p>{this.formatTestimonial(service.testimonial)}</p>
                        </div>
                      </div>
                    </div>
                  </Accordian>
                )}

                {!!locations.length && (
                  <Accordian
                    title="Where can I access it?"
                    className="service__accordian mobile-show"
                  >
                    {locations.map((location: IServiceLocation) => (
                      <LocationCard
                        location={location}
                        key={location.id}
                        className="service__accordian-inner"
                      />
                    ))}
                  </Accordian>
                )}

                {!!service.useful_infos.length && (
                  <Accordian title="Good to know" className="service__accordian mobile-show">
                    {service.useful_infos.map((info: { title: string; description: string }) => {
                      const iconObj = find(iconMap, info.title);
                      const icon = get(iconObj, `${info.title}`);

                      return <UsefulInfoCardAccordian icon={icon} info={info} key={uniqueId()} />;
                    })}
                  </Accordian>
                )}

                <Accordian
                  title={`Who runs this ${service.type}?`}
                  className="service__accordian mobile-show"
                >
                  <div className="service__accordian-inner">
                    <OrganisationCard service={service} />
                  </div>
                </Accordian>

                <div className="flex-col mobile-show">
                  <ButtonCard serviceStore={serviceStore} />
                </div>
              </div>
            </section>
            <section className="flex-col flex-col--4 flex-col--tablet--12 mobile-hide ">
              <div className="flex-container service__right-column">
                <div className="tablet-hide flex-col flex-col--10 criteria_card service__info__cost service__section">
                  <CostCard service={service} />
                </div>
                {service.video_embed && (
                  <div className="flex-container flex-container--mobile-no-padding mobile-hide service__video">
                    <VideoCard video={service.video_embed} width="100%" />
                  </div>
                )}
                <div className="flex-col flex-col--12">
                  <h2>{`How can I contact this ${service.type}?`}</h2>
                  {service.referral_method !== 'none' && (
                    <div className="service__section service__referral--desktop">
                      <ReferralCard
                        id={service.id}
                        referral_method={service.referral_method}
                        referral_url={service.referral_url}
                      />
                    </div>
                  )}
                  <div className="service__section">
                    <ContactCard service={service} />
                  </div>
                </div>
                <div className="flex-col flex-col--12">
                  <h2>{`Who runs this ${service.type}?`}</h2>
                  <div className="service__section">
                    <OrganisationCard service={service} sidebar={true} />
                  </div>
                </div>
                <div className="flex-col flex-col--12 flex-col--tablet--5">
                  <ButtonCard serviceStore={serviceStore} />
                </div>

                <div className="flex-col flex-col--12 flex-col--tablet--5">
                  <ShareCard />
                </div>
              </div>
            </section>
          </section>
        )}
        {relatedServices && <RelatedServices relatedServices={relatedServices} />}
      </main>
    );
  }
}

export default inject('serviceStore', 'uiStore')(observer(Service));
