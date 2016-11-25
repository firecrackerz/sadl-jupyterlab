// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import {
  JupyterLab, JupyterLabPlugin
} from 'jupyterlab/lib/application';

import {
  Widget
} from 'phosphor/lib/ui/widget';

import {
  TabPanel
} from 'phosphor/lib/ui/tabpanel';

import {
  ICommandPalette
} from 'jupyterlab/lib/commandpalette';

import {
  html
} from './html';

/**
 * The about page extension.
 */
export
const aboutExtension: JupyterLabPlugin<void> = {
  id: 'sadl.extensions.about',
  activate: activateAbout,
  autoStart: true,
  requires: [ICommandPalette]
};

function activateAbout(app: JupyterLab, palette: ICommandPalette): void {
  let widget = new Widget();
  widget.id = 'about-jupyterlab';
  widget.title.label = 'About';
  widget.title.closable = true;
  widget.node.innerHTML = html;
  widget.node.style.overflowY = 'auto';

  let command = 'about-jupyterlab:show';
  app.commands.addCommand(command, {
    label: 'About SADL',
    execute: () => {
      if (!widget.isAttached) {
        app.shell.addToMainArea(widget);
      }
      let stack = widget.parent;
      if (!stack) {
        return;
      }
      let tabs = stack.parent;
      if (tabs instanceof TabPanel) {
        tabs.currentWidget = widget;
      }
    }
  });
  palette.addItem({ command, category: 'Help' });
}
