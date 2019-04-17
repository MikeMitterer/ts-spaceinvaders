import {
    LFService,
    LoggerFactory,
    LoggerFactoryOptions,
    LogGroupRule,
    LogLevel,
} from 'typescript-logging';

// Create options instance and specify 2 LogGroupRules:
// * One for any logger with a name starting with model, to log on debug
// * The second one for anything else to log on info
const options = new LoggerFactoryOptions()
    .addLogGroupRule(new LogGroupRule(new RegExp('.+'), LogLevel.Info))
    .addLogGroupRule(new LogGroupRule(new RegExp('model.+'), LogLevel.Debug))
    .addLogGroupRule(new LogGroupRule(new RegExp('.+'), LogLevel.Info));

// Create a named loggerfactory and pass in the options and export the factory.
// Named is since version 0.2.+ (it's recommended for future usage)
export const loggerFactory: LoggerFactory = LFService.createNamedLoggerFactory(
    'mmit.spaceinvaders.LoggerFactory',
    options,
);
