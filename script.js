let currentMode = 'dev';

function setMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    if(document.getElementById('input-text').value) {
        processText();
    }
}

function processText() {
    const input = document.getElementById('input-text').value;
    let output = input;

    if (currentMode === 'dev') {
        output = input.split('\n')
                      .map(line => line.trimEnd())
                      .join('\n')
                      .replace(/[\r\n]{3,}/g, '\n\n');
    } 
    else if (currentMode === 'ai') {
        output = input.replace(/\r\n/g, '\n')
                      .replace(/([^\n])\n([^\n])/g, '$1 $2')
                      .replace(/\n{2,}/g, '\n\n')
                      .trim();
    } 
    else if (currentMode === 'bulk') {
        output = input.replace(/\s+/g, ' ')
                      .trim();
    }

    document.getElementById('output-text').value = output;
}

function updateStats() {
    const input = document.getElementById('input-text').value;
    const chars = input.length;
    const lines = input ? input.split('\n').length : 0;
    document.getElementById('char-stats').innerText = `Characters: ${chars} | Lines: ${lines}`;
}

function clearAll() {
    document.getElementById('input-text').value = '';
    document.getElementById('output-text').value = '';
    updateStats();
}

function copyToClipboard() {
    const outputText = document.getElementById('output-text');
    const copyBtn = document.getElementById('copy-btn');
    
    if (!outputText.value) {
        copyBtn.innerText = "Nothing to copy!";
        setTimeout(() => {
            copyBtn.innerText = "Copy to Clipboard";
        }, 1500);
        return;
    }

    navigator.clipboard.writeText(outputText.value).then(() => {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = "Copied! ✓";
        copyBtn.style.backgroundColor = "#047857";
        copyBtn.style.color = "#ffffff";
        
        setTimeout(() => {
            copyBtn.innerText = originalText;
            copyBtn.style.backgroundColor = "";
            copyBtn.style.color = "";
        }, 2000);
    }).catch(err => {
        console.error('Failed to write to clipboard: ', err);
        copyBtn.innerText = "Error copying!";
    });
}
