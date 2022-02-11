export function render(img, canvas, settings) {
    const ctx = canvas.getContext('2d');

    if (settings.backgroundColor == 'transparent') {
        ctx.fillStyle = 'rgba(0,0,0,0.0)';
        ctx.globalCompositeOperation = 'copy';
    } else {
        if (settings.invertColors) {
            ctx.fillStyle = settings.backgroundColor == 'white' ? 'black' : 'white';
        } else {
            ctx.fillStyle = settings.backgroundColor;
        }
        ctx.globalCompositeOperation = 'source-over';
    }
    
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    if(settings.rotate){
        // Matrix transformation
        ctx.translate(canvas.width / 2.0, canvas.height / 2.0);
        ctx.rotate(Math.PI);
        ctx.translate(-canvas.width / 2.0, -canvas.height / 2.0);
    }

    // Offset used for centering the image when requested
    let offset_x = 0;
    let offset_y = 0;

    switch(settings.scale) {
        case 'original': // Original
            if(settings.centerX) {
                offset_x = Math.round((canvas.width - img.width) / 2);
            }

            if(settings.centerY) {
                offset_y = Math.round((canvas.height - img.height) / 2);
            }

            ctx.drawImage(img, 0, 0, img.width, img.height, offset_x, offset_y, img.width, img.height);
        break;
        case 'scaleToFit': // Fit (make as large as possible without changing ratio)
            var horRatio = canvas.width / img.width;
            var verRatio = canvas.height / img.height;
            var useRatio = Math.min(horRatio, verRatio);

            if(settings.centerX) {
                offset_x = Math.round((canvas.width - img.width * useRatio) / 2);
            }

            if(settings.centerY) {
                offset_y = Math.round((canvas.height - img.height * useRatio) / 2);
            }

            ctx.drawImage(img, 0, 0, img.width, img.height, offset_x, offset_y, img.width * useRatio, img.height * useRatio);
        break;
        case 'stretchToFit': // Stretch x+y (make as large as possible without keeping ratio)
            ctx.drawImage(img, 0, 0, img.width, img.height, offset_x, offset_y, canvas.width, canvas.height);
        break;
        case 'stretchToFitX': // Stretch x (make as wide as possible)
            offset_x = 0;
            if(settings.centerY) {
                Math.round(offset_y = (canvas.height - img.height) / 2);
            }
            ctx.drawImage(img, 0, 0, img.width, img.height, offset_x, offset_y, canvas.width, img.height);
        break;
        case 'stretchToFitY': // Stretch y (make as tall as possible)
            offset_y = 0;
            if(settings.centerX) {
                offset_x = Math.round((canvas.width - img.width) / 2);
            }
            ctx.drawImage(img, 0, 0, img.width, img.height, offset_x, offset_y, img.width, canvas.height);
        break;
    }

    // Make sure the image is black and white
    if(settings.conversionMethod == 'horizontal1bit' || settings.conversionMethod == 'vertical1bit') {
        blackAndWhite(canvas, ctx, settings.threshold);
        if(settings.invertColors) {
            invert(canvas, ctx);
        }
    }

    // Flip image if needed
    if (settings.flipX) {
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(canvas, -canvas.width, 0);
        ctx.restore();
    }

    if (settings.flipY) {
        ctx.save();
        ctx.scale(1, -1);
        ctx.drawImage(canvas, 0, -canvas.height);
        ctx.restore();
    }
}

export function blackAndWhite(canvas, ctx, threshold) {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        avg = avg > threshold ? 255 : 0;
        data[i + 0] = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
    }
    ctx.putImageData(imageData, 0, 0);
}

export function invert(canvas, ctx) {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        data[i + 0] = 255 - data[i + 0]; // red
        data[i + 1] = 255 - data[i + 1]; // green
        data[i + 2] = 255 - data[i + 2]; // blue
    }
    ctx.putImageData(imageData, 0, 0);
}