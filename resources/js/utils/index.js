export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

export function charactersProtocolToCodeHex(string) {
    var regex_2F = /\//gi
    var regex_3F = /\?/gi
    var regex_3D = /\=/gi

    string = string.replace(regex_2F, '%2F')
    string = string.replace(regex_3F, '%3F')
    return string.replace(regex_3D, '%3D')
}
