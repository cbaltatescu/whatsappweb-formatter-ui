// content.js
chrome.runtime.onMessage.addListener(

  (request, sender, sendResponse) => {

    let selectedText, textBox;

    const format = (symbol) => {
      selectedText = window.getSelection().toString();
      if (selectedText[selectedText.length - 1] == ' ') {
        selectedText = selectedText.slice(0, -1);
      }
      if (selectedText.length) {
        document.execCommand('insertHTML', false, symbol + selectedText + symbol + ' ')
      }

      $('footer div[contenteditable]').trigger('change').trigger('keydown').trigger('keyup');
    }

    const WABold = () => {
      format('*');
    }

    const WAEm = () => {
      format('_');
    }

    const WAStrike = () => {
      format('~');
    }

    const hover = (el) => {
      $(el.currentTarget).addClass('wa-hover');
    }

    const hoverOut = (el) => {
      $(el.currentTarget).removeClass('wa-hover');
    }

    const addUI = () => {
      textBox = $('footer div[contenteditable]');
      let newDOM =
      `<div class='wa-extension'>
        <div id="wa-extension-bold" class="wa-extension-button"><strong>B</strong></div>
        <div id="wa-extension-em" class="wa-extension-button"><em>i</em></div>
        <div id="wa-extension-strike" class="wa-extension-button"><strike>S</strike></div>
      </div>`;
      $('footer').prepend(newDOM);
      $('#wa-extension-bold').on('click', WABold).on('mouseenter', hover).on('mouseleave', hoverOut);
      $('#wa-extension-em').on('click', WAEm).on('mouseenter', hover).on('mouseleave', hoverOut);
      $('#wa-extension-strike').on('click', WAStrike).on('mouseenter', hover).on('mouseleave', hoverOut);
    }

    $(document).keydown(function(e) {
      if (e.keyCode == 66 && e.ctrlKey) {
        WABold();
      }
      if (e.keyCode == 73 && e.ctrlKey) {
        WAEm();
      }
      if (e.keyCode == 192 && e.ctrlKey) {
        WAStrike();
      }
    });

    if( request.message === "clicked_browser_action" ) {
      $('#pane-side').children().children().children().children().each(function (index) {
        $(this).on('click', () => {
          setTimeout(addUI, 100);
        });
      });

      addUI();
    }
  }
);
