var gulp 			= require('gulp'), // Подключаем Gulp
	sass 			= require('gulp-sass'), //Подключаем Sass пакет,
	browserSync 	= require('browser-sync'), // Подключаем Browser Sync
	autoprefixer 	= require('gulp-autoprefixer'); // авто вендерные префиксы

gulp.task('default', ['watch']);

gulp.task('sass', function(){ // Создаем таск Sass
	return gulp.src('app/sass/**/*.scss') // Берем источник
		.pipe(sass({outputStyle: 'expanded'}).on('error',sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer(['last 15 version', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function(){ // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'app/' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('watch', ['browser-sync', 'sass'], function(){
	gulp.watch('app/sass/**/*.scss', ['sass']); // Наблюдение за sass файлами
	gulp.watch('app/*.html', browserSync.reload); // Наблюдение за html файлами
	gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за js файлами
});

gulp.task('clear', function(){
	return cache.clearAll();
});

