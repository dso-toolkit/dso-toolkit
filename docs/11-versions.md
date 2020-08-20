<script>
  document.addEventListener("DOMContentLoaded", function(event) { 
    getAllVersions().then(function (releases) {
      var $versionsContainer = $('#versions-container');

      releases.forEach(function (release) {
        var $col = $('<div><h2>' + release.label + '</h2><ul></ul></div>');
        var $list = $col.find('ul');

        release.versions.reverse().forEach(function (version, index) {
          $list.append($('<li><a href="/' + version.version + '">' + (version.label || version.version) + '</a></li>'));
        });

        $versionsContainer.append($col);
      })
    });
  });
</script>


<div id="versions-container">

</div>