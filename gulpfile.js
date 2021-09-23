const gulp = require('gulp');

// this converts the sass file to the css file
// here node sass is compiler since gulp sass does not have own compiler
const sass = require('gulp-sass')(require('node-sass'));
// this compresses the css file into smaller size

const cssnano = require('gulp-cssnano');

// the rev attaches a string to the all assets file so that the browser accepts the asset which is modified
//  and clear the cache of the previous asset stored in the browser
const rev = require('gulp-rev');

// uglify is used to minify the js file asset
const uglify = require('gulp-uglify-es').default;


const imagemin = require('gulp-imagemin');

// it deletes all the files in the public directory
const del = require('del');

gulp.task('css',function(done){
    console.log('minifying css');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'))

    // ** - any folder  * - subfolder containing .css file
    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd : 'public',
        merge : true
    }))
    .pipe(gulp.dest('./public/assets'));

    done();
});

gulp.task('js',function(done){
    console.log('minifying js');
    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd : 'public',
        merge : true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})

gulp.task('images',function(done){
    console.log('compressing images');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd : 'public',
        merge : true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})

// empty the public/assets directory of the previous build
gulp.task('clean:assets',function(done){
    del.sync('./public/assets');
    done();
});

gulp.task('build',gulp.series('clean:assets','css','js','images',function(done){
    console.log('building assets');
    done();
}))