import {
    IServiceManager
} from 'jupyterlab/lib/services';

import {
    JupyterLab, JupyterLabPlugin
} from 'jupyterlab/lib/application';

import {
    IEditorService, JupyterLabEditorService
} from '../../monaco/editorService';

import {
    defaultPathResolver, PathHandler, UriHandler
} from '../../monaco/uris';

import JLabHandler from './uriHandler';

export const editorServiceProvider: JupyterLabPlugin<IEditorService> = {
    id: 'sadl.extensions.languageServer.editorService',
    requires: [
        IServiceManager
    ],
    provides: IEditorService,
    activate: activateEditorServices,
    autoStart: true
};

function activateEditorServices(app: JupyterLab, serviceManager: IServiceManager): IEditorService {
    const pathHandler = new PathHandler(app, serviceManager);
    const uriHandler = new UriHandler(defaultPathResolver, pathHandler);
    const sadlUriHandler = new JLabHandler(uriHandler);
    return new JupyterLabEditorService(sadlUriHandler);
}
