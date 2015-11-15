var Loader = function(imagePath) {
  var self = this;
  this.data = {};
  this.queue = [];
  this.queuedCount = 0;
  this.imagePath = imagePath;

  this.queueFiles = function(files) {
    for(var key in files) { 
      if (files.hasOwnProperty(key)) {
        var src = files[key];
        self.queueFile(key, src);
      }
    }
  }

  this.queueFile = function(key, src) {
    this.count += 1;
    this.queue.push({'key':key, 'src':src});
  }

  this.loadFiles = function() {
    for(var i = 0; i < queue.length; i++) {
      self.loadFile(queue[i].key, queue[i].src);
    }
  }

  this.loadFile = function(key,src) {
    var img = new Image();
    img.onload = function(){ self.handleLoaded(key,img); }
    img.src = this.imagePath + src;
  }

  this.handleLoaded = function(key,val) {
    this.loadedCallback(key);
    this.data[key] = val;
    this.queuedCount -= 1;
    if (this.queuedCount == 0) {
      this.handleCompleted();
    }
  }

  this.loadedCallback = function(key) {
    console.log('File ' . key . ' loaded');
  }

  this.handleCompleted = function() {
    this.completedCallback();
  }

  this.completedCallback = function() {
    console.log('All files loaded');
  }
}