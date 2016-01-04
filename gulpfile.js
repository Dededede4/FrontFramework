var gulp = require('gulp'); 
var globule = require('globule');
var bowerFiles = require('main-bower-files');
var fs = require('fs');

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var util = require('gulp-util');
var less = require('gulp-less');
var header = require('gulp-header');
var clean = require('gulp-clean');

var paths = {
    htmlBundles: 'src/**/Ressources/views/*.html',
    htmlApp : 'app/Ressources/views/*.html',
    jsBundles: 'src/**/*.js',
    jsApp: 'app/**/*.js',
    cssBundles: 'src/**/*.css',
    cssApp: 'app/**/*.css',
    allBundles: 'src/**/*',
    allApp: 'app/**/*',
    assetsVendors1: 'vendors/**/dist/**.*',
    assetsVendors2: 'vendors/**/dist/**/**.*',
    assetsApp1: 'app/Ressources/public/**.*',
    assetsApp2: 'app/Ressources/public/**/**.*',
    assetsBundles1: 'src/**/Ressources/public/**.*',
    assetsBundles2: 'src/**/Ressources/public/**/**.*'
};

function jsArrayViews(){
    var views = {};
    var files = globule.find([paths.htmlBundles, paths.htmlApp]);

    for (var i = 0; i < files.length; i++) {
        var path = files[i];
        var sortPath = ''

        if (globule.isMatch(paths.htmlBundles, path)){
            sortPath = path.replace('/Ressources/views/', '::').substring(4);
        }
        else if(globule.isMatch(paths.htmlApp, path)){
            sortPath = path.replace('app/Ressources/views/', '::');
        }

        views[sortPath] = fs.readFileSync(path, 'utf8');
    }
    return '_TEMPLATES = '+(JSON.stringify(views))+';';
}

gulp.task('js', function () {
    var jsRegEx = (/.*\.js$/i);
    var jsFiles = bowerFiles({filter: jsRegEx});
    jsFiles.push(paths.jsApp);
    jsFiles.push(paths.jsBundles);

    var p = gulp.src(jsFiles) // Reverse for fix dependencies order
                .pipe(concat('app.js'))
                .pipe(header(jsArrayViews(), false))
                ;

    if (util.env.prod){ // gulp --prod
        p.pipe(uglify({mangle: false}));
    }

    p.pipe(gulp.dest('web/app/js'));
    return p;
});

gulp.task('styles', ['js'], function () {
    var lessRegEx = (/.*\.less$/i);
    var lessFiles = bowerFiles({filter: lessRegEx});

    var cssRegEx = (/.*\.css$/i);
    var cssFiles = bowerFiles({filter: cssRegEx});

    var files = lessFiles.concat(cssFiles);
    files.push(paths.cssApp);
    files.push(paths.cssBundles);

    return gulp.src(files)
        .pipe(less())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('web/app/css'));
});

gulp.task('clean', function(){
    return gulp.src('web/app').pipe(clean());
});

gulp.task('assets', ['clean'], function(){
    var ignore = ['js', 'map', 'css'];
    var files = globule.find([paths.assetsVendors1, paths.assetsVendors2,
                              paths.assetsApp1, paths.assetsApp2,
                              paths.assetsBundles1, paths.assetsBundles2]);
    for (var i = 0; i < files.length; i++) {
        var fileSrc = files[i];
        var folders = fileSrc.split('/');

        var filename = folders[folders.length - 1];
        var fileArray = filename.split('.');
        if (ignore.indexOf(fileArray[fileArray.length - 1]) > -1)
            continue;
        var fileDest = null;

        // For app/
        if (globule.isMatch(paths.assetsVendors1, fileSrc)  || globule.isMatch(paths.assetsApp1, fileSrc)){
            var fileDest = 'web/app/';
        }
        else if(globule.isMatch(paths.assetsVendors2, fileSrc) || globule.isMatch(paths.assetsApp2, fileSrc)){
            var fileDest = 'web/app/'+folders[folders.length - 2];
        }

        // For bundles
        if (globule.isMatch(paths.assetsBundles1, fileSrc)){
            var fileDest = 'web/'+folders[1];
        }
        else if(globule.isMatch(paths.assetsBundles2, fileSrc)){
            var fileDest = 'web/'+folders[1]+'/'+folders[folders.length - 2];
        }

        gulp.src(fileSrc).pipe(gulp.dest(fileDest));
    }
});

gulp.task('watch', [], function() {
  gulp.watch([paths.allBundles, paths.allApp], ['js', 'styles', 'assets'])
})

gulp.task('default', ['clean', 'js', 'styles', 'assets']);