import { Request, Response, NextFunction } from 'express';
import log from '../util/logging';
import * as fs from 'fs-extra';
import * as path from 'path';
import CacheService from '../services/CacheService';
import config from '../config';
import * as sharp from 'sharp';

const PUBLIC_PATH = path.resolve(__dirname, '../../public');

interface Image {
    lang: string,
    paths: {
        full: string,
        thumbnail: string,
    },
}

class GalleryController {
    private cache: CacheService;
    private galleryPath: string;
    
    constructor() {
        this.cache = new CacheService(600);
        this.galleryPath = path.resolve(__dirname, '../..', config.galleryPath);
    }

    index(req: Request, res: Response, next: NextFunction) {
        log.debug('Gallery')
            
        this.getImages().then(images => {
            next(res.render('gallery', {images}))
        })
    }

    private getImages(): Promise<Image[]> {
        return this.cache.get<Image[]>('images', (): Promise<Image[]> =>
            fs.readdir(this.galleryPath)
                .then(galleryFiles => 
                    Promise.all(
                        galleryFiles
                            .map(f => path.resolve(this.galleryPath, f))
                            .filter(f => fs.lstatSync(f).isDirectory())
                            .map(dir => {
                                const lang = path.basename(dir);
                                return fs.readdirSync(dir)
                                    .filter(f => !f.startsWith('thumb_') && this.isImageFile(f))
                                    .map(f => this.processImage(lang, path.resolve(dir, f)))
                            })
                            .reduce((acc, curr): Promise<Image>[] => {
                                acc.push(...curr)
                                return acc;
                            }, [])
                        )
                    )
        )
    }

    private isImageFile(file: string): boolean {
        return ['.png', '.jpg', '.jpeg', '.gif'].reduce((res, ext) => {
            if (res) return true;
            return file.endsWith(ext);
        }, false) 
    }

    private processImage(lang: string, p: string): Promise<Image> {
        const fdir = path.dirname(p)
        const fname = path.basename(p)
        const thumbnail = path.resolve(fdir, 'thumb_' + fname);

        const img = {
            lang,
            paths: {
                full: path.relative(PUBLIC_PATH, p),
                thumbnail: path.relative(PUBLIC_PATH, thumbnail)
            }
        }

        if (!fs.existsSync(thumbnail)) {
            return sharp(p)
                .resize(453, 640)
                .max()
                .toFile(thumbnail)
                .catch(log.error)
                .then(() => img);
        }
        return Promise.resolve(img);
    }
}

export default GalleryController;