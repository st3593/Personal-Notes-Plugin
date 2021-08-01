import { withPluginApi } from "discourse/lib/plugin-api";
import { iconNode } from "discourse-common/lib/icon-library";
import { h } from 'virtual-dom';
let icon = iconNode('sticky-note');

function initializePersonalNote(api) {
  // https://github.com/discourse/discourse/blob/master/app/assets/javascripts/discourse/lib/plugin-api.js.es6
  api.createWidget('note-menu', {
    tagName: 'div.note-panel',

    panelContents() {
      return h('div#quick-notes-container', [
        h('h1', 'Personal Notes'),
        h('div.notes-search-input', [
          h('input#notes-search', {type: 'text', placeholder: 'search notes'}),
          iconNode('search'),
        ]),
        h('ul', [
          h('li', h('a', [icon, 'Sticky Note 1'])),
          h('li', h('a', [icon, 'Sticky Note 2'])),
          h('li', h('a', [icon, 'Sticky Note 3'])),
        ]),
        h('a', {title: 'view all notes', id:'all-notes-icon'}, iconNode('angle-down')),
      ]);
    },
  
    html() {
      return this.attach('menu-panel', {
        contents: () => this.panelContents()
      });
    },
  
    clickOutside() {
      this.sendWidgetAction('toggleNote');
    }
  });

  api.decorateWidget('header-icons:after', function(helper) {
    const headerState = helper.widget.parentWidget.state;
    let contents = [];
      contents.push(helper.attach('header-dropdown', {
        title: 'take notes',
        icon: 'sticky-note',
        active: headerState.noteVisible,
        iconId: 'toggle-note-menu',
        action: 'toggleNote',
      }));
      if (headerState.noteVisible) {
              contents.push(helper.attach('note-menu'));
      }
      return contents;
  });
  
  api.attachWidgetAction('header', 'toggleNote', function() {
    this.state.noteVisible = !this.state.noteVisible;
  });
  
  api.onPageChange(() => {
    // let colorIds = ['first-color', 'second-color', 'third-color', 'fourth-color', 'fifth-color', 'transparent-choice'];
    let colorIds = ['first-color', 'second-color', 'third-color', 'fourth-color', 'fifth-color'];
    // let colors = ['#fdfd96','pink','paleturquoise','palegreen','lightgrey', 'transparent'];
    let colors = ['#fdfd96','pink','paleturquoise','palegreen','lightgrey'];
    for (let i = 0; i < colorIds.length; i++) {
      document.getElementById(`${colorIds[i]}`).onclick = function() {
        document.documentElement.style.setProperty("--note-background", `${colors[i]}`);
      }
    }

    document.getElementById('note-button').onclick = function() {
      var elem = document.getElementById("note-body");
      if (elem.style.display == "block") {
        elem.style.display = "none";
      } else {
        elem.style.display = "block";
      }
    }

    // document.getElementById('fonts-selector').onchange = function() {
    //   let x = document.getElementById("fonts-selector").value;
    //   if (x == "TimesNewRoman") {
    //     document.getElementById("note").style = "font-family: Times New Roman";
    //   } else if (x == "Arial") {
    //     document.getElementById("note").style = "font-family: Arial";
    //   } else if (x == "Courier") {
    //     document.getElementById("note").style = "font-family: Courier";
    //   }
    // }

    // document.getElementById('font-styles-selector').onchange = function() {
    //   let x = document.getElementById("font-styles-selector").value;
    //   if (x == "normal") {
    //     document.getElementById("note").style = "font-weight: normal";
    //   } else if (x == "italic") {
    //     document.getElementById("note").style = "font-style: italic";
    //   } else if (x == "bold") {
    //     document.getElementById("note").style = "font-weight: bold";
    //   }
    // }

    // document.getElementById('font-sizes-selector').onchange = function() {
    //   let x = document.getElementById("font-sizes-selector").value;
    //   if (x == "small") {
    //     document.getElementById("note").style = "font-size: small";
    //   } else if (x == "medium") {
    //     document.getElementById("note").style = "font-size: medium";
    //   } else if (x == "large") {
    //     document.getElementById("note").style = "font-size: large";
    //   }
    // }
    document.getElementById('saveStyle').onclick = function() {
      let font = document.getElementById('fonts-selector').value;
      let font_style = document.getElementById('font-styles-selector').value;
      let font_size = document.getElementById('font-sizes-selector').value;
      // console.log(font);
      // console.log(font_style);
      // console.log(font_size);
      if (font_style=='italic') {
        document.getElementById("note").style = "font-family: "+ font + ";\n" + "font-style: " + font_style + ";\n" + "font-size: " + font_size + ";";
      } else {
        document.getElementById("note").style = "font-family: "+ font + ";\n" + "font-weight: " + font_style + ";\n" + "font-size: " + font_size + ";";
      }
    }

    document.getElementById('note-body-settings-buttons').onclick = function() {
      let x = document.getElementById("note-body-styling-buttons");
      let formWindow = document.getElementById("form");
      if (x.style.display === "block") {
        x.style.display = "none";
        formWindow.style.height = "235px";
      } else {
        x.style.display = "block";
        
        formWindow.style.height = "429.17px";
      }
    }
  });
}

export default {
  name: "personal-notes",

  initialize() {
    withPluginApi("0.8.31", initializePersonalNote);
  }
};
