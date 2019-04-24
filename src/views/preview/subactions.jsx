const FormattedDate = require('react-intl').FormattedDate;
const FormattedMessage = require('react-intl').FormattedMessage;
const PropTypes = require('prop-types');
const React = require('react');
const FlexRow = require('../../components/flex-row/flex-row.jsx');

const Button = require('../../components/forms/button.jsx');
const AddToStudioModal = require('./add-to-studio.jsx');
const SocialModal = require('../../components/modal/social/container.jsx');
const ReportModal = require('../../components/modal/report/modal.jsx');
const projectShape = require('./projectshape.jsx').projectShape;

require('./subactions.scss');

const Subactions = props => (
    <FlexRow className="subactions">
        <div className="share-date">
            <div className="copyleft">&copy;</div>
            {' '}
            {/*  eslint-disable react/jsx-sort-props */}
            {props.shareDate ? (
                <FormattedDate
                    value={Date.parse(props.shareDate)}
                    day="2-digit"
                    month="short"
                    year="numeric"
                />
            ) : 'Unshared'}
            {/*  eslint-enable react/jsx-sort-props */}
        </div>
        <FlexRow className="action-buttons">
            {props.canAddToStudio &&
                <React.Fragment>
                    <Button
                        className="action-button studio-button"
                        key="add-to-studio-button"
                        onClick={props.onAddToStudioClicked}
                    >
                        <FormattedMessage id="addToStudio.title" />
                    </Button>
                    {props.addToStudioOpen && (
                        <AddToStudioModal
                            isOpen
                            isAdmin={props.isAdmin}
                            key="add-to-studio-modal"
                            userOwnsProject={props.userOwnsProject}
                            onRequestClose={props.onAddToStudioClosed}
                            onToggleStudio={props.onToggleStudio}
                        />
                    )}
                </React.Fragment>
            }
            <Button
                className="action-button copy-link-button"
                onClick={props.onCopyProjectLink}
            >
                <FormattedMessage id="general.copyLink" />
            </Button>
            <Button
                className="action-button social-button"
                onClick={props.onsocialClicked}
            >
                <FormattedMessage id="general.socialButton" />
            </Button>
            {props.socialOpen && props.projectInfo && props.projectInfo.id && (
                <SocialModal
                    isOpen
                    key="social-modal"
                    projectId={props.projectInfo && props.projectInfo.id}
                    onCopyProjectLink={props.onCopyProjectLink}
                    onRequestClose={props.onsocialClosed}
                />
            )}
            {(props.canReport) &&
            <React.Fragment>
                <Button
                    className="action-button report-button"
                    key="report-button"
                    onClick={props.onReportClicked}
                >
                    <FormattedMessage id="general.report" />
                </Button>
                {props.reportOpen && (
                    <ReportModal
                        isOpen
                        key="report-modal"
                        type="project"
                        onReport={props.onReportSubmit}
                        onRequestClose={props.onReportClose}
                    />
                )}
            </React.Fragment>
            }
        </FlexRow>
    </FlexRow>
);

Subactions.propTypes = {
    addToStudioOpen: PropTypes.bool,
    canAddToStudio: PropTypes.bool,
    canReport: PropTypes.bool,
    socialOpen: PropTypes.bool,
    isAdmin: PropTypes.bool,
    onAddToStudioClicked: PropTypes.func,
    onAddToStudioClosed: PropTypes.func,
    onCopyProjectLink: PropTypes.func,
    onsocialClicked: PropTypes.func,
    onsocialClosed: PropTypes.func,
    onReportClicked: PropTypes.func.isRequired,
    onReportClose: PropTypes.func.isRequired,
    onReportSubmit: PropTypes.func.isRequired,
    onToggleStudio: PropTypes.func,
    projectInfo: projectShape,
    reportOpen: PropTypes.bool,
    shareDate: PropTypes.string,
    userOwnsProject: PropTypes.bool
};

module.exports = Subactions;
