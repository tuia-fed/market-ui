import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
export declare type WebpackConfig = Webpack.Configuration & {
    devServer?: WebpackDevServer.Configuration;
};
