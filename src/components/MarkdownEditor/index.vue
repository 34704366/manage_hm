<template>
    <div class="components-container">
        <div :id="id"></div>
        <el-button style="margin-top:80px;" type="primary" icon="el-icon-document" @click="getHtml">
            Get HTML
        </el-button>
        <div v-html="html" />
    </div>
</template>

<script>
import Editor from 'tui-editor'
import defaultOptions from './default-options'


// deps for editor
import 'codemirror/lib/codemirror.css' // codemirror
import 'tui-editor/dist/tui-editor.css' // editor ui
import 'tui-editor/dist/tui-editor-contents.css' // editor content


export default {
    name: "MarkdownEditor",
    props: {
        value: {
            type: String,
            default: ''
        },
        id: {
            type: String,
            required: false,
            default() {
                return 'markdown-editor-' + + new Date() + ((Math.random() * 1000).toFixed(0) + '')
            }
        },
        options: {
            type: Object,
            default() {
                return defaultOptions
            }
        },
        mode: {
            type: String,
            default: 'markdown'
        },
        height: {
            type: String,
            required: false,
            default: '300px'
        },
        language: {
            type: String,
            required: false,
            default: 'en_US' // https://github.com/nhnent/tui.editor/tree/master/src/js/langs
        }
    },
    data() {
        return {
            editor: null,
            html: '',
        }
    },
    computed: {
        editorOptions() {
            const options = Object.assign({}, defaultOptions, this.options);
            options.initialEditType = this.mode;
            options.height = this.height;
            options.language = this.language;
            return options;

        }
    },
    watch: {
        value(newValue, preValue) {
            if (newValue !== preValue && newValue !== this.editor.getValue()) {
                this.editor.setValue(newValue);
            }
        },
        language() {
            this.destroyEditor();
            this.initEditor();
        },
        height(newValue) {
            this.editor.height(newValue)
        },
        mode(newValue) {
            this.editor.changeMode(newValue)
        }
    },
    mounted() {
        this.initEditor();

        window.onload = function() {

            var ua = navigator.userAgent.toLowerCase();
            console.log(ua)
        }
        
    },
    destroyed() {
        this.destroyEditor()
    },

    methods: {
        initEditor() {
            this.editor = new Editor({
                el: document.getElementById(this.id),
                ...this.editorOptions
            })
            if (this.value) {
                this.editor.setValue(this.value);
            }
            this.editor.on('change', () => {
                this.$emit('input', this.editor.getValue());
            })
        },

        destroyEditor() {
            if (!this.editor) {
                return;
            }
            this.editor.off('change');
            this.editor.remove();
        },
        setValue(value) {
            this.editor.setValue(value)
        },
        getValue() {
            return this.editor.getValue()
        },
        setHtml(value) {
            this.editor.setHtml(value)
        },
        getHtml() {
            this.html = this.editor.getHtml();
        },

    },
}
</script>
<style lang="scss" scoped>
.test {
    color: rgb(158, 80, 80);
    background-color: aqua;
}
</style>