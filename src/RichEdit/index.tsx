import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

type RichEditorProps = {
    /**
     * @description       富文本编辑器内容
     * @default           无
     */
    html: string;
    /**
     * @description       富文本宽度
     * @default           100%
     */
    width?: string|number;
    /**
     * @description       富文本高度
     * @default           100%
     */
    height?: string|number;
    /**
     * @description       富文本提示文字
     * @default           '请输入内容...'
     */
    placeholder?: string;
    /**
     * @description       富文本内容编辑回调
     * @default           无
     */
    onChange?: (e:any) => void;
  };

const RichEditor = (props: RichEditorProps )=> {
    const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {
        excludeKeys:[
            'uploadImage',
            'uploadVideo',
            'fullScreen'
        ]
     } 

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {    // TS 语法
        placeholder: props.placeholder || '请输入内容...',
    }

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <>
            <div style={{ border: '1px solid #ccc', display: 'flex', flexDirection: 'column', width: props.width || '100%',height: props.height || '100%' }}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={props.html}
                    onCreated={setEditor}
                    onChange={editor => {props.onChange && props.onChange(editor.getHtml())}}
                    mode="default"
                    style={{ flexGrow: 1 , overflowY: 'scroll', overflowX: 'scroll' }}
                />
            </div>
        </>
    )
}

export default RichEditor;