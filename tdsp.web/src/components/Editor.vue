<template>
  <div class="editor-wrapper">
    <div :id="editorId"></div>
  </div>
</template>
<script>
import Editor from 'wangeditor'
import 'wangeditor/release/wangEditor.min.css'
export default {
  name: 'Editor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    editorId (val) {
      return `editor${this._uid}`
    }
  },
  watch: {
    value (val) {
      this.setHtml(val)
    }
  },
  mounted () {
    this.editor = new Editor(`#${this.editorId}`)
    this.editor.customConfig.onchange = (html) => {
      this.$emit('on-change', html)
    }
    this.editor.create()
    const html = this.value
    this.editor.txt.html(html)
  },
  methods: {
    setHtml (val) {
      this.editor.txt.html(val)
    }
  }
}
</script>
