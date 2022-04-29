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
    vec3 l_vector = light_position - frag_pos;
    vec3 diffuse = light_color * material_color * dot(frag_normal, l_vector);
    vec3 V_vector = camera_position - frag_pos;
    vec3 reflection = reflect(l_vector, frag_normal);
    vec3 specular = light_color * material_specular * pow(dot(reflection, V_vector), material_shininess);

    FragColor = vec4(ambient + diffuse + specular, 1.0);

}
