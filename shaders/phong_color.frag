#version 300 es

precision mediump float;

in vec3 frag_pos;
in vec3 frag_normal;

uniform vec3 light_ambient;
uniform vec3 light_position;
uniform vec3 light_color;
uniform vec3 camera_position;
uniform vec3 material_color;      // Ka and Kd
uniform vec3 material_specular;   // Ks
uniform float material_shininess; // n

out vec4 FragColor;

void main() {
    vec3 ambient = light_ambient * material_color;
    vec3 l_vector = normalize(light_position - frag_pos);
    float diffdot = dot(frag_normal, l_vector);
    if(diffdot < 0.0) 
    {
        diffdot = 0.0;
    }
    vec3 diffuse = light_color * material_color * diffdot;
    vec3 V_vector = normalize(camera_position - frag_pos);
    vec3 reflection = normalize(reflect(-l_vector, frag_normal));
    float specdot = dot(reflection, V_vector);
    if(specdot < 0.0)
    {
        specdot = 0.0;
    }
    vec3 specular = light_color * material_specular * pow(specdot, material_shininess);

    FragColor = vec4(ambient + diffuse + specular, 1.0);

}