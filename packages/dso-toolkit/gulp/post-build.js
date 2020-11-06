/* eslint-env node */

const gulp = require('gulp');

const fs = require('fs');
const cheerio = require('cheerio');
const tap = require('gulp-tap');
const path = require('path');

const escapeHtml = require('./functions/escape-html');

module.exports = {
  postBuild: wcagReports,
  wcagReports
};

let headingWeight = ['ERROR', 'WARNING', 'NOTICE'];
let sourceTab = 'notes';

function wcagReports() {
  return gulp.src('build/library/components/detail/*.html')
    .pipe(tap(function (file) {
      let filename = path.basename(file.path, '.html');
      let data = null;

      try {
        data = fs.readFileSync(`wcag/${filename}.json`, { encoding: 'utf-8' });
      }
      catch (e) {
        if (~filename.indexOf('--')) {
          try {
            data = fs.readFileSync(`wcag/${filename.substr(0, filename.indexOf('--'))}.json`, { encoding: 'utf-8' });
          }
          catch (e) {
            noop(e);
          }
        }
      }

      if (data) {
        let messages = Object
          .values(JSON.parse(data))[0]
          .messageLog
          .reduce((total, message) => total.filter(t => t.issue === message.issue).length === 0 ? total.concat(message) : total, [])
          .sort((a, b) => {
            let issueA = (headingWeight.indexOf(a.heading) + a.issue).toLowerCase();
            let issueB = (headingWeight.indexOf(b.heading) + b.issue).toLowerCase();

            if (issueA < issueB) {
              return -1;
            }

            if (issueA > issueB) {
              return 1;
            }

            return 0;
          });

        if (messages.length > 0) {
          let wcagHtml = messages
            .map(message => `<h3>${message.heading}: ${message.issue}</h3><p>${message.description}</p><code>${escapeHtml(message.element.node)}</code>`)
            .join('\n');

          let tabId;
          let wcagId;

          let $ = cheerio.load(file.contents.toString());

          let wcagTab = $(`.Browser-tab--${sourceTab}`)
            .clone()
            .removeClass(`Browser-tab--${sourceTab}`)
            .addClass('Browser-tab--wcag');

          $('a', wcagTab)
            .text('WCAG')
            .attr('href', function () {
              let href = $(this).attr('href');

              tabId = href.substr(1);
              wcagId = href.substr(1).replace(`-panel-${sourceTab}`, '-panel-wcag');

              return `#${wcagId}`;
            });

          $('.Browser-tabs').append(wcagTab);

          let browserId = tabId.replace(`-panel-${sourceTab}`, '');

          let wcagPanel = $(`#${tabId}`)
            .clone()
            .attr('id', wcagId);

          $('.Prose', wcagPanel)
            .html(wcagHtml);

          $(`#${browserId}`).append(wcagPanel);

          file.contents = Buffer.from($.html());
        }
      }
    }))
    .pipe(gulp.dest('build/library/components/detail'));
}

function noop() {
  return null;
}
