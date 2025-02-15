const fs = require('fs').promises;
const path = require('path');
const localeNames = {
  'en': 'English', // 英语
  'zh-CN': '简体中文',
  'es': 'Español', // 西班牙语
  'fr': 'Français', // 法语
  'bn': 'বাংলা (Bangla)', // 孟加拉语
  'ru': 'Русский', // 俄语
  'pt': 'Português', // 葡萄牙语
  'pt-BR': 'Português do Brasil', // 巴西葡萄牙语
  'id': 'Bahasa Indonesia', // 印度尼西亚语
  'de': 'Deutsch', // 德语
  'ja': '日本語', // 日语
  'tr': 'Türkçe', // 土耳其语
  'vi': 'Tiếng Việt', // 越南语
  'th': 'ไทย (Thai)', // 泰语
  'ko': '한국어', // 韩语
  'it': 'Italiano', // 意大利语
  'uk': 'Українська', // 乌克兰语
  'zh-TW': '繁体中文', // 繁体中文
  
} 
const directoryPath = path.join(__dirname, '../messages');

async function processLanguage(file) {
    if (!file.endsWith('.json')) {
        file += '.json';
    }
    const language = file.split('.')[0];
    if (language === 'en') {
        return;
    }
    console.log("正在处理语言：" + language + "," + localeNames[language], file);

    const enFilePath = path.join(directoryPath, 'en.json');
    const targetFilePath = path.join(directoryPath, file);

    try {
        await fs.access(targetFilePath);
        console.log(`${language} 的翻译文件已存在，开始同步键值...`);
        
        const enData = JSON.parse(await fs.readFile(enFilePath, 'utf8'));
        const targetData = JSON.parse(await fs.readFile(targetFilePath, 'utf8'));
        let hasChanges = false;

        // 遍历英文文件的键，检查目标文件是否缺失
        for (const key in enData) {
            if (!targetData.hasOwnProperty(key)) {
                // 如果key不存在，无论是对象还是普通值，都直接复制
                targetData[key] = enData[key];
                hasChanges = true;
                console.log(`添加缺失的键: ${key}`);
            } else if (typeof enData[key] === 'object' && enData[key] !== null) {
                // 如果是对象类型，检查第二层
                for (const subKey in enData[key]) {
                    if (!targetData[key][subKey]) {
                        targetData[key][subKey] = enData[key][subKey];
                        hasChanges = true;
                        console.log(`添加缺失的键: ${key}.${subKey}`);
                    }
                }
            }
            // 如果是一层键且已存在，保持原值不变
        }

        // 删除多余的一级键
        for (const key in targetData) {
            if (!enData.hasOwnProperty(key)) {
                delete targetData[key];
                hasChanges = true;
                console.log(`删除多余的键: ${key}`);
            }
        }

        if (hasChanges) {
            await fs.writeFile(targetFilePath, JSON.stringify(targetData, null, 2), 'utf8');
            console.log(`${language} 文件已更新同步`);
        } else {
            console.log(`${language} 文件无需更新`);
        }
    } catch (error) {
        // 如果文件不存在，复制 en.json 的内容创建新文件
        console.log(`${language} 的翻译文件不存在，将从 en.json 创建新文件`);
        const enData = await fs.readFile(enFilePath, 'utf8');
        await fs.writeFile(targetFilePath, enData, 'utf8');
        console.log(`${language} 文件创建完成：${targetFilePath}`);
    }
}

async function processLanguagesInQueue(languages, concurrency = 20) {
    const queue = [...languages];
    const inProgress = new Set();
    const results = [];

    async function processNext() {
        if (queue.length === 0) return;
        const language = queue.shift();
        inProgress.add(language);

        try {
            await processLanguage(language);
            results.push(`${language} 处理完成`);
        } catch (error) {
            results.push(`${language} 处理失败: ${error.message}`);
        } finally {
            inProgress.delete(language);
            if (queue.length > 0) {
                await processNext();
            }
        }
    }

    const workers = Array(Math.min(concurrency, languages.length))
        .fill()
        .map(() => processNext());

    await Promise.all(workers);
    return results;
}

async function main() {
    try {
        console.log("开始处理语言翻译")
        const languagesToProcess = Object.keys(localeNames).filter(key => key !== 'en');
        const results = await processLanguagesInQueue(languagesToProcess);
        console.log("处理结果:", results.join('\n'));
    } catch (err) {
        console.error('Error:', err);
    }
}

main();

module.exports = main;







