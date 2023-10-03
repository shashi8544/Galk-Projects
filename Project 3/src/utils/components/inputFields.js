import React, { useState, useRef, useMemo, useEffect } from "react";
import { Select, Spin } from "antd";
import debounce from "lodash/debounce";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./style.css";

export const AsyncSelect = ({
	fetchOptions,
	debounceTimeout = 800,
	...props
}) => {
	const [fetching, setFetching] = useState(false);
	const [options, setOptions] = useState([]);
	const fetchRef = useRef(0);

	const debounceFetcher = useMemo(() => {
		const loadOptions = (value) => {
			fetchRef.current += 1;
			const fetchId = fetchRef.current;
			setOptions([]);
			setFetching(true);
			fetchOptions(value).then((newOptions) => {
				if (fetchId !== fetchRef.current) {
					// for fetch callback order
					return;
				}

				setOptions(newOptions);
				setFetching(false);
			});
		};

		return debounce(loadOptions, debounceTimeout);
	}, [fetchOptions, debounceTimeout]);

	return (
		<Select
			labelInValue={true}
			onSearch={debounceFetcher}
			notFoundContent={fetching ? <Spin size="small" /> : null}
			{...props}
			filterOption={true}
			optionFilterProp="label"
			optionLabelProp="label"
			options={options}
		/>
	);
};

export const DraftEditor = ({ value = "", onChange }) => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const onEditorStateChange = (editorState) => {
		setEditorState(editorState);
		onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
	};

	useEffect(() => {
		if (value) {
			const html = value;
			const contentBlock = htmlToDraft(html);
			if (contentBlock) {
				const contentState = ContentState.createFromBlockArray(
					contentBlock.contentBlocks
				);
				const editorState = EditorState.createWithContent(contentState);
				setEditorState(editorState);
			} else {
				setEditorState(EditorState.createEmpty());
			}
		} else {
			setEditorState(EditorState.createEmpty());
		}
	}, []);

	return (
		<span>
			<Editor
				editorState={editorState}
				toolbarClassName="editorToolbar"
				wrapperClassName="editorWrapper"
				editorClassName="editorPlayArea"
				onEditorStateChange={onEditorStateChange}
				toolbar={{
					options: [
						"inline",
						"fontSize",
						"blockType",
						"list",
						"textAlign",
						"colorPicker",
						"link",
						"remove",
						"history",
					],
					inline: {
						inDropdown: false,
						className: undefined,
						component: undefined,
						dropdownClassName: undefined,
						options: ["bold", "italic", "underline"],
					},
					fontSize: {
						options: [8, 9, 10, 11, 12, 14, 16, 18],
						className: "blockTypeFontSizeClassName",
						component: undefined,
						dropdownClassName: "blockTypeDropdownClassName",
					},
					blockType: {
						inDropdown: true,
						options: [
							"Normal",
							"H1",
							"H2",
							"H3",
							"H4",
							"H5",
							"H6",
							"Blockquote",
							"Code",
							"Span",
						],
						className: "blockTypeClassName",
						component: undefined,
						dropdownClassName: "blockTypeDropdownClassName",
					},
				}}
			/>
		</span>
	);
};
